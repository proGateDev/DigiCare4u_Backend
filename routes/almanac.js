const express = require("express");
const router = express.Router();
const controller = require("../controllers/almanac");
//==========================================

router.post("/get", controller.almanac);
router.post("/get-dynamic", controller.almanac_df);
router.post("/get-planet-transit", controller.almanac_planet_transit);


module.exports = router;    