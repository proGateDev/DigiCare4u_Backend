const express = require("express");
const router = express.Router();
const adminRoutes = require("./admin/routes");
const memberRoutes = require("./member/routes");
const userRoutes = require("./user/routes");
const sosRoutes = require("./routes/sos");
const jwtDecryptRoutes = require("./routes/jwtDecrypt");
const authRoutes = require("./routes/auth");
const trackRoutes = require("./routes/track");
const assignRoutes = require("./routes/assignment");

//=================================
router.use("/admin", adminRoutes);
router.use("/user", userRoutes);
router.use("/member", memberRoutes);



router.use('/sos', sosRoutes);
router.use('/jwt', jwtDecryptRoutes);
router.use('/auth', authRoutes);
router.use('/track', trackRoutes);
router.use('/assign', assignRoutes);
// app.use('/api', punchRoutes);
// app.use('/api', scheduleRoutes);
// app.use('/api', sessionRoutes);
// app.use('/api', locationLogRoutes);
// app.use('/api', activityLogRoutes);

//=================================

module.exports = router;
