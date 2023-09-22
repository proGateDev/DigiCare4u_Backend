const mongoose = require("mongoose");
//===================================
// const schema = new mongoose.Schema({
//   name: String,
//   natal: [
//     {
//       _id: false,
//       house: Number,
//       sign: String,
//       lord: String,
//       deposited: Number,
//       anyPlanet: [
//         {
//           _id: false, name: String, position: String
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
