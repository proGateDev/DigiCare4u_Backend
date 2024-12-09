const express = require("express");
const router = express.Router();
const controller = require("../controller/channels");
const checkUserToken = require("../middleware/jwt");
//==========================================
router.post("/", checkUserToken,controller.createChannel);
router.get("/", checkUserToken,controller.getChannels);

router.get("/members", checkUserToken,controller.getChannelMembers);
router.post("/channel-members", checkUserToken,controller.createChannelMembers);


module.exports = router;
