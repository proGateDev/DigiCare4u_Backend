const express = require("express");
const router = express.Router();
const adminProfileRoutes = require("./routes/profile");
const adminProfilesListRoutes = require("./routes/profiles");
const adminAuthRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");



router.use("/profile", adminProfileRoutes);  
router.use("/auth", adminAuthRoutes);       
router.use("/profile-list", adminProfilesListRoutes);     
router.use("/user", userRoutes);     

module.exports = router;
