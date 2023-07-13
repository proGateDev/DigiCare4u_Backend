const express = require("express");
const router = express.Router();
const userRoutes = require("./user/routes/user");

module.exports = router.use("/user", userRoutes);
