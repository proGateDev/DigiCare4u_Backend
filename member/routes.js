const express = require("express");
const router = express.Router();
const memberAuthRoutes = require("./routes/auth");
const memberProfileRoutes = require("./routes/profile");



router.use("/auth", memberAuthRoutes);       
router.use("/profile", memberProfileRoutes);       



module.exports = router;
