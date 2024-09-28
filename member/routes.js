const express = require("express");
const router = express.Router();
const memberAuthRoutes = require("./routes/auth");
const memberProfileRoutes = require("./routes/profile");
const memberTrackRoutes = require("./routes/tracking");



router.use("/auth", memberAuthRoutes);       
router.use("/profile", memberProfileRoutes);       
router.use("/track", memberTrackRoutes);       



module.exports = router;
