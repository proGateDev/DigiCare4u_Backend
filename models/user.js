const mongoose = require("mongoose");
//===================================
const schema = new mongoose.Schema({
  name: String,
  natal: [
    {
      _id: false,
      house: Number,
      sign: String,
      lord: String,
      deposited: Number,
      anyPlanet: [{ _id: false, name: String, position: String }],
    },
  ],
});

const model = mongoose.model("user", schema);

module.exports = model;
