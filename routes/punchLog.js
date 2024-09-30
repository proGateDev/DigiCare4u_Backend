const express = require('express');
const router = express.Router();
const punchController = require('../controller/log/punchLog');

// Route to punch in
router.post('/punch-in', punchController.punchIn);

// Route to punch out
router.post('/punch-out', punchController.punchOut);

// Route to get punch logs for a member
router.get('/punch/:memberId', punchController.getPunchLogs);

module.exports = router;
