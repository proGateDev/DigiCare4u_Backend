const express = require("express");
const router = express.Router();
const memberAuthRoutes = require("./routes/auth");



router.use("/auth", memberAuthRoutes);       



module.exports = router;
