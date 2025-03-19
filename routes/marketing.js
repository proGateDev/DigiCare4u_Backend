const express = require('express');
const router = express.Router();
const marketingController = require('../controller/marketing');

// Route to log an activity
router.post('/contact-us', marketingController.contactUs);

// Route to get activity logs for a member

module.exports = router;
