const Router = require("express")
const userController = require("../controllers/userController")
const router = new Router()
const authHandler = require("../middleware/authMiddleware")

router.post("/registration", userController.registration)
router.post("/login", userController.login)
router.get("/auth", authHandler, userController.auth)

module.exports = router