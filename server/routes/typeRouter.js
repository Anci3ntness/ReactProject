const Router = require("express")
const typeController = require("../controllers/typeController")
const checkHandler = require("../middleware/checkRoleMiddleware")

const router = new Router()

router.post("/", checkHandler("ADMIN"), typeController.create)
router.get("/", typeController.getAll)

module.exports = router