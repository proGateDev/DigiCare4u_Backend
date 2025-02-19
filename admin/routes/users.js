const express = require("express");
const router = express.Router();
const controller = require("../controllers/user");
const checkUserToken = require("../../middleware/jwt");
//==========================================


router.get("/list", checkUserToken, controller.getAllUsers);    
router.get("/:userId", checkUserToken, controller.getUserById);    

router.get("/members/list/:userId", checkUserToken, controller.getUserMembers);    

module.exports = router;
