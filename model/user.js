const mongoose = require("mongoose");

//===================================
const userSchema = new mongoose.Schema({
  name: String,
  role: String,
  email: String,
  mobile: String,
  password: String,
  userType : String,
  groupType : String,
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

const model = mongoose.model('user', userSchema);
module.exports = model;

