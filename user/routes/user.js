const express = require("express");
const router = express.Router();
const controller = require("../controllers/user");
const checkUserToken = require("../../middleware/jwt");
//==========================================
// router.get("/get", controller.getUser);
router.post("/login", controller.login);
router.post("/create-admin-user", controller.createAdminUser);
router.get("/get-logged-in-user-members", controller.getUserMember);

router.get("/get-logged-in-user", checkUserToken, controller.geLoggedInUser);

module.exports = router;
