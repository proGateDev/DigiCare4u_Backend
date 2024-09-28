const express = require("express");
const router = express.Router();
const controller = require("../controllers/tracking");
const checkUserToken = require("../../middleware/jwt");
//==========================================


router.put("/",checkUserToken, controller.updateMemberLocation); // Create

module.exports = router;
