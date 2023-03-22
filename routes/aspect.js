const express = require("express");
const router = express.Router();
const controller = require("../controllers/aspect");
//==========================================
router.get("/current", controller.getCurrent);
router.get("/opp", controller.getOpp);
router.get("/sqaure", controller.getSqaure);
router.get("/trine", controller.getTrine);

module.exports = router;
