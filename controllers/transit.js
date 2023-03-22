const dayjs = require("dayjs");
const transitModel = require("../models/transit");
//==================================================
module.exports = {
  //===========================================
  getTransit: async (req, res) => {
    const data = await transitModel.find({ planet: req.query.tab });
    console.log("================================= ======", req.query.tab);

    const filteredYearData = data[0]?.transit?.filter((x) => {
      if (dayjs(x.date).year() == req.query.year) {
        return x;
      }
    });

    res.status(200).json(filteredYearData);
  },
  //===============  POST_NEW ====================================
  postFirstTransit: async (req, res) => {
    const transits =  new transitModel(req.body);
    try {
      
      await transits.save();
      res.status(201).json(transits);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  //===============  POST ====================================
  postTransit: async (req, res) => {
    const transits = await transitModel.find({ planet: req.body.planet });
    try {
      const data = transits[0].transit.push({
        date: req.body.date,
        time: req.body.time,
        zodiac: req.body.zodiac,
      });
      console.log(
        "================================= ======",
        transits[0].transit
      );
      await transits[0].save();
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
