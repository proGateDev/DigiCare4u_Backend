const express = require("express");
const router = express.Router();
const controller = require("../controllers/user");
const checkUserToken = require("../middleware/jwt");
//==========================================
router.get("/user", controller.getUser);
router.post("/byId", controller.getUserById);
router.post("/", controller.createUser);
router.post("/house-signs", controller.getUserHouseSigns);
router.get("/transit", controller.getUserTransit);

module.exports = router;
