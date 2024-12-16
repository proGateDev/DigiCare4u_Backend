const express = require('express');
const router = express.Router();
const trackController = require('../controller/assignment');
const checkUserToken = require("../middleware/jwt");

router.post('/location',checkUserToken, trackController.assignment);
router.get('/location', checkUserToken,trackController.getAssignment);

router.patch('/location', checkUserToken,trackController.patchAssignment);

module.exports = router;
