const mongoose = require("mongoose");

//===================================
const locationHistorySchema = new mongoose.Schema({
  memberId: { type: mongoose.Schema.Types.ObjectId, ref: 'Member' },
  latitude: { type: Number },
  longitude: { type: Number },
  timestamp: { type: Date, default: Date.now }
});

const trackingHistory = mongoose.model('LocationHistory', locationHistorySchema);


module.exports = memberModel.trackingHistory

