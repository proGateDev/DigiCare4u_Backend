const express = require("express");
const router = express.Router();
const controller = require("../controllers/chartData");
//==========================================
router.get("/get", controller.getChartData);

module.exports = router;
