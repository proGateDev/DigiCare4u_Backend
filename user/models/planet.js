const mongoose = require("mongoose");
//===================================


const planetSchema = new mongoose.Schema({
  name: String,
  longitude: String,
  nakshatras: String,
  nakshatrasLord: String,
  rulerOf: String,
  isIn: String,
  landLord: String,
  event_id: { type: mongoose.Schema.Types.ObjectId, ref: 'PlanetEvent' },

  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});






const Planet = mongoose.model('Planet', planetSchema);


module.exports = {

  Planet,

};
