const express = require("express");
const router = express.Router();
const memberAuthRoutes = require("./routes/auth");
const memberProfileRoutes = require("./routes/profile");
const memberTrackRoutes = require("./routes/tracking");
const subMemberskRoutes = require("./routes/subMembers");



router.use("/auth", memberAuthRoutes);       
router.use("/profile", memberProfileRoutes);       
router.use("/track", memberTrackRoutes);       
router.use("/team", subMemberskRoutes);       



module.exports = router;
