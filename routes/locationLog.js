const express = require('express');
const router = express.Router();
const locationLogController = require('../controller/log/locationLog');

// Route to log member location
router.post('/location/log', locationLogController.logLocation);

// Route to get location logs for a member
router.get('/location/:memberId', locationLogController.getLocationLogs);

module.exports = router;
