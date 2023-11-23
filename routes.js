const express = require("express");
const router = express.Router();
const userRoutes = require("./user/routes/user");
const almanac = require("./routes/almanac");

module.exports = router.use("/almanac", almanac);
