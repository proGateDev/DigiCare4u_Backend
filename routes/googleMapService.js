const express = require("express");
const router = express.Router();
const controller = require("../controller/googleMapService");
const checkUserToken = require("../middleware/jwt");
//==========================================
router.get("/places/:placeQuery", checkUserToken,controller.getPlaces);  //-------> create-channel


module.exports = router;
