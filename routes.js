const express = require("express");
const router = express.Router();
const userRoutes = require("./user/routes/user");
const planetRoutes = require("./routes/planets");

module.exports = router.use("/planet", planetRoutes);
