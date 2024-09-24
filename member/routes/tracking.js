const express = require("express");
const router = express.Router();
const controller = require("../../admin/controllers/profile");
const checkUserToken = require("../../middleware/jwt");
//==========================================


router.post("/",checkUserToken, controller.createAdminProfile); // Create

module.exports = router;
