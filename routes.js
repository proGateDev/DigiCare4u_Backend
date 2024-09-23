const express = require("express");
const router = express.Router();
const adminRoutes = require("./admin/routes");
const userRoutes = require("./user/routes");

//=================================
router.use("/admin", adminRoutes);
router.use("/user", userRoutes);

//=================================

module.exports = router;
