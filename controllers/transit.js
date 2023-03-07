const dayjs = require("dayjs");
const model = require("../models/transit");
//==================================================
module.exports = {
  //===========================================
  getTransit: async (req, res) => {
    const data = await model.find({ planet: req.query.tab });
    const filteredYearData = data.filter((x) => {
      if (dayjs(x.date).year() === parseInt(req.query.year)) {
        return x;
      }
    });

    console.log("----------->", filteredYearData);

    // if (filteredYearData.length === 0) {
    //   res.status(404).json("Not Found");
    // } else {
    //   res.status(200).json(filteredYearData);
    // }
    res.status(200).json(filteredYearData);
  },

  //===============  POST ====================================
  postTransit: async (req, res) => {
    const transits = await model.find({ planet: req.body.planet });
    // const planet = transits.find((x) => x.planet === "sun");

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
