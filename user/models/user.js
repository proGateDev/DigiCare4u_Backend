const mongoose = require("mongoose");
//===================================
// const schema = new mongoose.Schema({
//   name: String,
  // dob: String,
  // time: String,
  // location: String,
//   natal: [
//     {
//       _id: false,
//       house: Number,
//       sign: String,
//       lord: String,
//       deposited: Number,
//       anyPlanet: [
//         {
//            _id: false, 
//            name: String,
//            position: String
//         }
//       ],
//       l
//     },
//   ],
// });

const schema = new mongoose.Schema({
  name: String,
  dob: String,
  time: String,
  location: String,
  planets: [
    {
      name: String,
      longitude: String,
      nakshatras: String,
      nakshatrasLord: String,
      rulerOf: String,
      isIn: String,
      landLord: String,
      events: [
        {
          planet: String, // sun
          eventName: String,// sun entering in virgo
          ingressIn: String,// virgo
          date: Date, // 15-09-2023
          userHouse: String, // 9th
          prediction: String,// shedding light on religious activities vigorously
          // ego clashes for spouse's brother sibbling   
        }
      ]
    }
  ],
  houses: [
    {
      bhava: String,//9th 
      residents: String,//mars
      rashi: String,//virgo
      owner: String,//mercury
      rashiMode: String,//mutable
      gender: String,// female
      aspectedBy: Array,// [saturn ]
      ages: Array //[ 8th , 20th, 32th]
    }
  ]
});

const model = mongoose.model("user", schema);

module.exports = model;


// Assuming you have Mongoose installed and required in your project
const mongoose = require('mongoose');

// Define the Schema for each entity

const userSchema = new mongoose.Schema({
  name: String,
  dob: String,
  time: String,
  location: String,
  planets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Planet' }], // Reference to Planet(s)
  houses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'House' }], // Reference to House(s)
});

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

const planetEventSchema = new mongoose.Schema({
  planet: { type: mongoose.Schema.Types.ObjectId, ref: 'Planet' }, // Reference to Planet
  eventName: String,
  ingressIn: String,
  date: Date,
  userHouse: String,
  prediction: String,
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

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

// Create the models

const User = mongoose.model('User', userSchema);
const Planet = mongoose.model('Planet', planetSchema);
const PlanetEvent = mongoose.model('PlanetEvent', planetEventSchema);
const House = mongoose.model('House', houseSchema);
const HouseAspect = mongoose.model('HouseAspect', houseAspectSchema);
const HouseAge = mongoose.model('HouseAge', houseAgeSchema);

// Export the models for use in other parts of your application

module.exports = {
  User,
  Planet,
  PlanetEvent,
  House,
  HouseAspect,
  HouseAge,
};
