const express = require("express");
const router = express.Router();
const userAuthRoutes = require("./routes/auth");
const userMembersRoutes = require("./routes/members");
const userProfileRoutes = require("./routes/profile");


router.use("/auth", userAuthRoutes);       
router.use("/profile", userProfileRoutes);       
router.use("/members",  userMembersRoutes);       


module.exports = router;
