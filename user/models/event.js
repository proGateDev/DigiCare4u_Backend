const mongoose = require("mongoose");
//===================================


const planetEventSchema = new mongoose.Schema({
  planet: { type: mongoose.Schema.Types.ObjectId, ref: 'Planet' }, // Reference to Planet
  eventName: String,
  ingressIn: String,
  date: Date,
  userHouse: String,
  prediction: String,
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});



const PlanetEvent = mongoose.model('PlanetEvent', planetEventSchema);



module.exports = {
  PlanetEvent

};
