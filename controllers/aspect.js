const dayjs = require("dayjs");
const aspectData = require("../constants/content");
const model = require("../models/transit");
//==================================================
module.exports = {
  //================ GET_CURRENT_TRANSIT ===========================
  getCurrent: async (req, res) => {
    const planet = await model.find({ planet: req.query.planet });

    const now = dayjs();
    const month = now.month();

    const planetTransit = planet[0].transit;
    const data = planetTransit.find((w) => {
      if (dayjs(w.date).month() == month) return w;
    });
    res.status(200).json(data?.zodiac);
  },
  //============== GET_OPPOSITE_SIGN =============================
  getOpp: async (req, res) => {
    const planet = await model.find({ planet: req.query.planet });
    const now = dayjs();
    const month = now.month();

    const planetTransit = planet[0].transit;

    const current = planetTransit.find((w) => {
      if (dayjs(w.date).month() == month) return w;
    });

    if (typeof current?.zodiac === "undefined") {
      return res
        .status(404)
        .json(`No transit for ${req.query.planet} this month`);
    }

    // console.log(current.zodiac);
    const oppSign = aspectData?.find((x) => {
      if (current.zodiac === x.sign) {
        return x.opp;
      }
    });

    res.status(200).json(oppSign);
  },
  //============== GET_SQAURE_SIGN =============================
  getSqaure: async (req, res) => {
    const planet = await model.find({ planet: req.query.planet });
    const now = dayjs();
    const month = now.month();

    const planetTransit = planet[0].transit;

    const current = planetTransit.find((w) => {
      if (dayjs(w.date).month() == month) return w;
    });

    if (typeof current?.zodiac === "undefined") {
      return res
        .status(404)
        .json(`No transit for ${req.query.planet} this month`);
    }

    // console.log(current.zodiac);
    const sqaureSign = aspectData?.find((x) => {
      if (current.zodiac === x.sign) {
        return x.square;
      }
    });

    res.status(200).json(sqaureSign.square);
  },

  //============== GET_TRINE_SIGN =============================
  getTrine: async (req, res) => {
    const planet = await model.find({ planet: req.query.planet });
    const now = dayjs();
    const month = now.month();

    const planetTransit = planet[0].transit;

    const current = planetTransit.find((w) => {
      if (dayjs(w.date).month() == month) return w;
    });

    if (typeof current?.zodiac === "undefined") {
      return res
        .status(404)
        .json(`No transit for ${req.query.planet} this month`);
    }

    // console.log(current.zodiac);
    const trineSign = aspectData?.find((x) => {
      if (current.zodiac === x.sign) {
        return x.trine;
      }
    });

    res.status(200).json(trineSign.trine);
  },
  //============== GET_OPPOSITE_SIGN =============================
  getOpp: async (req, res) => {
    const planet = await model.find({ planet: req.query.planet });
    const now = dayjs();
    const month = now.month();

    const planetTransit = planet[0].transit;

    const current = planetTransit.find((w) => {
      if (dayjs(w.date).month() == month) return w;
    });

    if (typeof current?.zodiac === "undefined") {
      return res
        .status(404)
        .json(`No transit for ${req.query.planet} this month`);
    }

    // console.log(current.zodiac);
    const oppSign = aspectData?.find((x) => {
      if (current.zodiac === x.sign) {
        return x.opp;
      }
    });

    res.status(200).json(oppSign?.opp);
  },
};
