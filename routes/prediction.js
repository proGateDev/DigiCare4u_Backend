const express = require("express");
const router = express.Router();
const controller = require("../controllers/prediction");
//==========================================
router.post("/", controller.getPrediction);

module.exports = router;
