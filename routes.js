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
// const { contactUs } = require("./controller/contactUs");
const channelsRoutes = require("./routes/channels");
const locationLogRoutes = require("./routes/locationLog");
const googleMapServiceRoutes = require("./routes/googleMapService");
const marketingRoutes = require("./routes/marketing");

//=================================
router.use("/admin", adminRoutes);
router.use("/user", userRoutes);
router.use("/member", memberRoutes);



router.use('/sos', sosRoutes);
router.use('/jwt', jwtDecryptRoutes);
router.use('/auth', authRoutes);
router.use('/track', trackRoutes);
router.use('/assignment', assignRoutes);
router.post('/marketing', marketingRoutes);

router.use('/channels', channelsRoutes);

// app.use('/api', scheduleRoutes);
// app.use('/api', sessionRoutes);
router.use('/location', locationLogRoutes);
// app.use('/api', activityLogRoutes);
router.use('/google-map-service', googleMapServiceRoutes);

//=================================

module.exports = router;
