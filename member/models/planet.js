const mongoose = require("mongoose");
//===================================

const planetSchema = new mongoose.Schema({
  name: String,
  longitude: String,
  rulerOf: Object,
  isIn: String,
  landLord: String,
});


const planetModel = mongoose.model('Planet', planetSchema);
module.exports = planetModel
