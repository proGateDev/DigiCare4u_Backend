const express = require("express");
const router = express.Router();
const controller = require("../controllers/members");
const checkUserToken = require("../../middleware/jwt");
const multer = require('multer');
const uploadData = require("../../middleware/upload");

//==========================================


router.post(
    "/",
    checkUserToken,
    uploadData.single('file'),
    controller.createUserMember
);
router.get("/list", checkUserToken, controller.getUserMembers);
router.get('/:memberId', checkUserToken, controller.getUserMemberById);
router.delete('/:memberId', controller.deleteUserMemberById);
router.get('/:memberId/daily-transit', controller.getUserMemberDailyTransit);




module.exports = router;
