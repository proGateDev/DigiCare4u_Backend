const express = require("express");
const router = express.Router();
const controller = require("../controllers/transit");
//==========================================
router.get("/", controller.getTransit);
router.post("/", controller.postTransit);
router.post("/new", controller.postFirstTransit);

module.exports = router;
