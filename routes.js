const express = require("express");
const router = express.Router();
const adminRoutes = require("./routes/user");

module.exports = router.use("/admin", adminRoutes);
