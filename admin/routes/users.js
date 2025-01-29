const express = require("express");
const router = express.Router();
const controller = require("../controllers/user");
const checkUserToken = require("../../middleware/jwt");
//==========================================


router.get("/list", checkUserToken, controller.getAllUsers);    


module.exports = router;
