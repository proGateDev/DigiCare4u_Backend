const express = require('express');
const router = express.Router();
const trackController = require('../controller/assignment');
const checkUserToken = require("../middleware/jwt");

router.post('/location', trackController.assignment);
router.get('/location', checkUserToken,trackController.getAssignment);


module.exports = router;
