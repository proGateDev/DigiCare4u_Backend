const mongoose = require("mongoose");
//===================================
const userSchema = new mongoose.Schema({
  name: String,
  lagna: String,
  sun: String,
  moon: String,
});

const model = mongoose.model("user", userSchema);

module.exports = model;
