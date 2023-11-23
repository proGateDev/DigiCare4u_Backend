const express = require("express");
const router = express.Router();
const controller = require("../controllers/almanac");
//==========================================

router.post("/get", controller.almanac);

module.exports = router;