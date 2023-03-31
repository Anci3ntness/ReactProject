const ApiError = require("../error/ApiError")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { User, Basket } = require("../models/models")

function jwtGenerate(id, mail, role) {
    return jwt.sign({ id, mail, role }, process.env.JWT_SECRET, { expiresIn: "24h" })

}

class userController {
    async registration(req, res, next) {
        const { mail, password, role } = req.body
        if (!mail || !password) {
            return next(ApiError.badRequest("Некорректная почта или пароль"))
        }
        const candidate = await User.findOne({ where: { mail } })
        if (candidate) {
            return next(ApiError.badRequest("Пользователь с такой почтой уже существует"))
        }
        const hashPass = await bcrypt.hash(password, 5)
        const user = await User.create({ mail, role, password: hashPass })
        const basket = await Basket.create({ userId: user.id })
        const token = jwtGenerate(user.id, user.mail, user.role)
        return res.json({ token: token })
    }
    async login(req, res, next) {
        const { mail, password } = req.body
        const user = await User.findOne({ where: { mail } })
        if (!user) {
            return next(ApiError.badRequest("Пользователь не найден!"))
        }
        let comparePass = bcrypt.compareSync(password, user.password)
        if (!comparePass) {
            return next(ApiError.badRequest("Неверный пароль!"))
        }
        const token = jwtGenerate(user.id, user.mail, user.role)
        return res.json({ token: token })
    }
    async auth(req, res, next) {
        const token = jwtGenerate(req.user.id.req.user.mail, req.user.role)
        return res.json({ token: token })

    }
}
module.exports = new userController()