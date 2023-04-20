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

const transitModel = mongoose.model("transit", transitSchema);

module.exports = transitModel;


