const mongoose = require("mongoose");

//===================================
const userSchema = new mongoose.Schema({
  name: String,
  role: { type: String, enum: ['super-admin', 'user', 'member'], default: 'user' },
  members: { type: mongoose.Schema.Types.ObjectId, ref: 'member' }, // User who added this member
  userType: { type: String, default: 'user' },

  email: { type: String, unique: true },
  mobile: String,
  password: String,
  groupType: { type: String, default: 'none' },
  isSubscribed: { type: Boolean, default: false },

  isDeleted: { type: Boolean, default: false},
  createdBy: { type: String, default: "system" },
  updatedBy: { type: String, default: "system" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },




});

// Update updatedAt field before saving
userSchema.pre('save', function (next) {
  // console.log('======= MONGOOSE middleware ------>');

  this.updatedAt = Date.now();
  next();
});

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;

