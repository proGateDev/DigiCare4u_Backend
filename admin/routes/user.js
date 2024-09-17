const express = require("express");
const router = express.Router();
const controller = require("../controllers/user");
const checkUserToken = require("../middleware/jwt");
//==========================================
// router.get("/get", controller.getUser);
router.post("/login", controller.login);
router.post("/create-admin", controller.createUser);
router.get("/get-admin", controller.getUser);

module.exports = router;
