const express = require("express");
const router = express.Router();
const controller = require("../controllers/chart");
//==========================================
router.get("/chart", controller.getNatalChart);

module.exports = router;
