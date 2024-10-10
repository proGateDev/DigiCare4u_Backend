const express = require("express");
const router = express.Router();
const controller = require("../controllers/profile");
const checkUserToken = require("../../middleware/jwt");
//==========================================


// router.post("/", controller.createAdminProfile); // Create
router.get("/",checkUserToken, controller.getUserProfile);     // Read
router.patch("/", checkUserToken, controller.updateUserProfile);   // Update
// router.delete("/", checkUserToken, controller.deleteAdminProfile); // Delete


module.exports = router;
