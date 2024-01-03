const { required } = require("../user/validation/user");

const { almanacData } = require('../utils/astro')
//==================================================

module.exports = {
  almanac: async (req, res) => {
    try {
      console.log('======================================= started');

      const date = req.body.date
      const time = req.body.time
      if (!date) {
        res.status(404).json({ 'message': 'provide date' });

      } else {

        let ccc = almanacData(date, time)

        jsonResponse = {
          status: 200,
          message: "Planetary position for a given date & time",
          data: await ccc,
        };

        res.status(200).json(jsonResponse);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

};
