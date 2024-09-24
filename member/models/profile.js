const mongoose = require("mongoose");

//===================================
const userSchema = new mongoose.Schema({
  name: String,
  role: { type: String, enum: ['super-admin', 'user', 'member'], default: 'member' },
  parentUser: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }, // User who added this member

  email: { type: String, unique: true }, 
  mobile: String,
  password: String,
  // userType: { type: String, default: 'member' },
  groupType: { type: String, default: 'none' },
  location: {
    latitude: { type: Number, default: 0.00 },
    longitude: { type: Number, default: 0.00 },
    updatedAt: { type: Date, default: Date.now }
  },
  
  status: String, // For tracking SOS or emergency status
  punchInTime: { type: Date },
  isApproved: { type: Boolean, default: false },

  isDeleted: { type: Boolean, default: false },
  createdBy: { type: String, default: "system" },
  updatedBy: { type: String, default: "system" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },




});

// Update updatedAt field before saving
userSchema.pre('save', function (next) {
  console.log('======= MONGOOSE middleware ------>');

  this.updatedAt = Date.now();
  next();
});

const memberModel = mongoose.model('member', userSchema);
module.exports = memberModel;

