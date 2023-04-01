const ApiError = require("../error/ApiError");
const ErrorHandler = require("../middleware/ErrorHandlerMiddleware")

describe("ErrorHandler", () => {
    const req = {};
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),

    };
    const next = jest.fn();

    it("should return error response and status code as defined in the ApiError instance provided", () => {
        const err = new ApiError(404, "Not found");
        ErrorHandler(err, req, res, next);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: "Not found",
        });
    });

    it("should return internal server error and default message if the error is not an instance of ApiError", () => {
        ErrorHandler(new Error(), req, res, next);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.status().json).toHaveBeenCalledWith({
            message: "Непредвиденная ошибка",
        });
    });
});
