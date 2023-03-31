const Router = require("express")
const deviceController = require("../controllers/deviceController")
const checkHandler = require("../middleware/checkRoleMiddleware")

const router = new Router()

router.post("/", checkHandler("ADMIN"), deviceController.create)
router.get("/", deviceController.getAll)
router.get("/:id", deviceController.getOne)

module.exports = router