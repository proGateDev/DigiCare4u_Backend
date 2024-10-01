const express = require('express');
const router = express.Router();
const authController = require('../controller/auth');

// Route to log an activity
router.post('/login', authController.login);

module.exports = router;
