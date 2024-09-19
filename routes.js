const express = require("express");
const router = express.Router();
// const userRoutes = require("./user/routes/user");
// const almanacRoutes = require("./routes/almanac");
// const chartRoutes = require("./routes/chartData");
// const authRoutes = require("./routes/auth");
const adminRoutes = require("./admin/routes/user");

// const almanacRoute = router.use("/almanac", almanacRoutes);
// const userRoute = router.use("/user", userRoutes);
// const chartRoute = router.use("/chart", chartRoutes);
// const authtRoute = router.use("/auth", authRoutes);
const adminRoute = router.use("/admin", adminRoutes);


module.exports =adminRoute
