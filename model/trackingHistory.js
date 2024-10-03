const mongoose = require("mongoose");

// Define location history schema
const locationHistorySchema = new mongoose.Schema({
  memberId: { type: mongoose.Schema.Types.ObjectId, ref: 'member' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  
  // Use geospatial data for tracking locations
  location: {
    type: {
      type: String,
      enum: ['Point'], // 'Point' for 2D sphere indexing
      required: true,
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },
  
  timestamp: { type: Date, default: Date.now },
});

// Create a 2dsphere index for efficient geospatial queries
locationHistorySchema.index({ location: '2dsphere' });

const trackingHistoryModel = mongoose.model('trackingHistory', locationHistorySchema);
module.exports = trackingHistoryModel;
