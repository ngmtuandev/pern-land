const router = require("express").Router();

const controller = require("../controllers/user");
const { verifyToken } = require("../middlewares/verifyToken");

router.get("/user-current", verifyToken, controller.getInfoUser);
router.get("/roles", controller.getRoles);
router.patch("/update-user", verifyToken, controller.updateUser);

module.exports = router;
