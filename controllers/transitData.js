const transitModel = require("../models/calendarTransit");
//==================================================
module.exports = {
  //===========================================
  getTransit: async (req, res) => {
    const data = await transitModel.find({});

    res.status(200).json(data);
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
