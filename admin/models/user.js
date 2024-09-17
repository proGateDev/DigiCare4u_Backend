const mongoose = require("mongoose");

//===================================
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,

  // createdAt: String



});



const model = mongoose.model('user', userSchema);
module.exports = model;

