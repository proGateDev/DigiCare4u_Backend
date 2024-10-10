const express = require("express");
const router = express.Router();
const controller = require("../../member/controllers/profile");
const checkUserToken = require("../../middleware/jwt");
//==========================================

router.get("/", checkUserToken, controller.getMemberProfile);     
router.patch("/", checkUserToken, controller.updateMemberProfile);   // Update



module.exports = router;
