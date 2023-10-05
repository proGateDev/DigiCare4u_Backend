const mongoose = require("mongoose");
//===================================

const planetSchema = new mongoose.Schema({
  name: String,
  longitude: String,
  rulerOf: String,
  isIn: String,
  landLord: String,
});


const planetModel = mongoose.model('Planet', planetSchema);
module.exports = planetModel
