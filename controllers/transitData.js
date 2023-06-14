const transitModel = require("../models/calendarTransit");
const swisseph = require("swisseph");

//==================================================
module.exports = {
  //===========================================
  getTransit: async (req, res) => {
    const data = await transitModel.find({});

    const date = { year: 2015, month: 1, day: 1, hour: 0 };
    var julday = swisseph.swe_julday(
      date.year,
      date.month,
      date.day,
      date.hour,
      swisseph.SE_GREG_CAL
    );

    res.status(200).json(julday);
  },
  // =========  POST ====================================
  postTransit: async (req, res) => {
    const transits = new transitModel({
      title: req.body.title,
      start: req.body.start,
      description: req.body.description,
    });
    console.log(transits);
    // return
    try {
      await transits.save();
      res.status(201).json(transits);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
