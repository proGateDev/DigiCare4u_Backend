const express = require('express');
const router = express.Router();
const punchController = require('../controllers/attendance');
const checkUserToken = require('../../middleware/jwt');

router.post('/', checkUserToken, punchController.markAttendance);


module.exports = router;
