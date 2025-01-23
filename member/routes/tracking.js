const express = require("express");
const router = express.Router();
const controller = require("../controllers/tracking");
const checkUserToken = require("../../middleware/jwt");
//==========================================


router.put("/",checkUserToken, controller.updateMemberLocation); 
router.post("/records",checkUserToken, controller.postMemberLocation); 
router.get("/records",checkUserToken, controller.getMemberLocationsRecords); 
router.get("/records-for-map",checkUserToken, controller.getMemberLocationsRecordsForMap); 

// router.get("/records",checkUserToken, controller.getMemberLocations); 

router.get("/live-location-tracking-insight-report",checkUserToken, controller.fetchMemberLiveLocationInsightReport); 


module.exports = router;

