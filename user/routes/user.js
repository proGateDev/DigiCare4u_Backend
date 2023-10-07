const express = require("express");
const router = express.Router();
const controller = require("../controllers/user");
const checkUserToken = require("../middleware/jwt");
//==========================================
router.get("/planet", controller.getPlanet);
router.get("/get", controller.getUser);
router.post("/byId", controller.getUserById);
router.post("/create", controller.createUser);
router.post("/house-signs", controller.getUserHouseSigns);
// router.post("/eph", controller.getEph);

module.exports = router;
