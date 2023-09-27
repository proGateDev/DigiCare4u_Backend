const mongoose = require("mongoose");
//===================================


const houseSchema = new mongoose.Schema({
  bhava: String,
  residents: String,
  rashi: String,
  owner: String,
  rashiMode: String,
  gender: String,
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const houseAspectSchema = new mongoose.Schema({
  house_id: { type: mongoose.Schema.Types.ObjectId, ref: 'House' },
  aspectedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Planet' }], // Reference to Planet
});

const houseAgeSchema = new mongoose.Schema({
  house_id: { type: mongoose.Schema.Types.ObjectId, ref: 'House' },
  age: [Number], // Assuming multiple ages
});



const House = mongoose.model('House', houseSchema);
const HouseAspect = mongoose.model('HouseAspect', houseAspectSchema);
const HouseAge = mongoose.model('HouseAge', houseAgeSchema);


module.exports = {

  House,
  HouseAspect,
  HouseAge,
};
