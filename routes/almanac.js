const express = require("express");
const router = express.Router();
const controller = require("../controllers/almanac");
//==========================================

router.get("/get", controller.almanac);

module.exports = router;