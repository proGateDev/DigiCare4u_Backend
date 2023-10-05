const express = require("express");
const router = express.Router();
const controller = require("../controllers/planets");
//==========================================
router.get("/get", controller.getPlanet);


module.exports = router;
