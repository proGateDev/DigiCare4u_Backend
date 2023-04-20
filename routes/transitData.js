const express = require("express");
const router = express.Router();
const controller = require("../controllers/transitData");
//==========================================
router.get("/get", controller.getTransit);
router.post("/post", controller.postTransit);


module.exports = router;
