const mongoose = require("mongoose");

const moment = require('moment-timezone');
const dateIST = moment.tz(Date.now(), "Asia/Kolkata");
//===================================
const userSchema = new mongoose.Schema({
  name: String,
  dob: String,
  time: String,
  location: {
    name: String,
    lat: Number,
    long: Number,
  },
  planets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Planet'
  }],
  createdAt: String



});



const model = mongoose.model('User', userSchema);
module.exports = model;

