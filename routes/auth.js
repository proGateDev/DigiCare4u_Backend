const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth");
//==========================================
router.post("/authenticate", controller.authUser);

module.exports = router;
