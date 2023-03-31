const Router = require("express")
const brandController = require("../controllers/brandController")
const checkHandler = require("../middleware/checkRoleMiddleware")

const router = new Router()

router.post("/", checkHandler("ADMIN"), brandController.create)
router.get("/", brandController.getAll)

module.exports = router