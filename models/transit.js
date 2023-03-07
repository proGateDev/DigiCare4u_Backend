const mongoose = require("mongoose");
//===================================
const transitSchema = new mongoose.Schema({
  planet: {
    type: String,
  },

  transit: [
    {
      date: String,
      time: String,
      zodiac: String,
    },
  ],
});

const model = mongoose.model("transit", transitSchema);

module.exports = model;
