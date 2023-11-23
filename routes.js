const express = require("express");
const router = express.Router();
const userRoutes = require("./user/routes/user");
const almanacRoutes = require("./routes/almanac");
const chartRoutes = require("./routes/chartData");

const almanacRoute = router.use("/almanac", almanacRoutes);
const userRoute = router.use("/user", userRoutes);
const chartRoute = router.use("/chart", chartRoutes);


module.exports = userRoute, almanacRoute, chartRoute
