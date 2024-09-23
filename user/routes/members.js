const express = require("express");
const router = express.Router();
const controller = require("../controllers/members");
const checkUserToken = require("../../middleware/jwt");
//==========================================


router.post("/",checkUserToken, controller.createUserMember);   
router.get("/",checkUserToken, controller.getUserMembers);   



module.exports = router;
