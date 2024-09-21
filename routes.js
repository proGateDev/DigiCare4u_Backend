const express = require("express");
const router = express.Router();
const adminProfileRoutes = require("./admin/routes/profile");
const adminRoutes = require("./admin/routes");

const adminRoute = router.use("/admin", adminRoutes);


module.exports =adminRoute