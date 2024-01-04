const express = require("express");
const router = express.Router();
const controller = require("../controllers/almanac");
//==========================================

router.post("/get", controller.almanac);
router.post("/get-dynamic", controller.almanac_df);

module.exports = router;