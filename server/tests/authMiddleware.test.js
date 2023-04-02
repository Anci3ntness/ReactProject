require("dotenv").config()
const jwt = require("jsonwebtoken");

const authHandler = require('../middleware/authMiddleware');

test("testing authHandler function", () => {
    const req = {
        method: 'OPTIONS',
        headers: {
            authorization: 'Bearer token'
        }
    };
    const res = {
        status: function (statusCode) {
            expect(statusCode).toBe(401);
            return this; // returning the response object for chaining
        },
        json: function (data) {
            expect(data).toEqual({ message: "Пользователь не авторизован!" });
            return this; // returning the response object for chaining
        }
    };
    const next = jest.fn();
    authHandler(req, res, next);
    expect(next).toHaveBeenCalled();
});

test("testing authHandler function with valid token", () => {
    const token = jwt.sign({ userId: '12345' }, process.env.JWT_SECRET, {
        expiresIn: '24h'
    });
    const req = {
        method: 'GET',
        headers: {
            authorization: 'Bearer ' + token
        }
    };
    const res = {
        status: function (statusCode) {
            expect(statusCode).toBe(200);
            return this; // returning the response object for chaining
        },
        json: function (data) {
            return this; // returning the response object for chaining
        }
    };
    const next = jest.fn();
    authHandler(req, res, next);
    expect(req.user).toBeDefined();
    expect(req.user.userId).toBe('12345');
    expect(next).toHaveBeenCalled();
});

test("testing authHandler function with invalid token", () => {
    const token = "invalid_token";
    const req = {
        method: 'GET',
        headers: {
            authorization: 'Bearer ' + token
        }
    };
    const res = {
        status: function (statusCode) {
            expect(statusCode).toBe(401);
            return this; // returning the response object for chaining
        },
        json: function (data) {
            expect(data).toEqual({ message: "Пользователь не авторизован!" });
            return this; // returning the response object for chaining
        }
    };
    const next = jest.fn();
    authHandler(req, res, next);
    expect(req.user).toBeUndefined();
    expect(next).not.toHaveBeenCalled();
});