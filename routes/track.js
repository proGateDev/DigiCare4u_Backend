const express = require('express');
const router = express.Router();
const trackController = require('../controller/track');

// Route to create SOS log
router.post('/geo-code', trackController.geoCode);


module.exports = router;
