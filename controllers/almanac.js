const { required } = require("../user/validation/user");

const { almanacData } = require('../utils/astro')
//==================================================

module.exports = {
  almanac: async (req, res) => {
    try {

      const date = req.body.date
      const time = req.body.time
      let ccc = almanacData(date,time)

      jsonResponse = {
        message: "user---------------",
        data: await ccc,
      };

      res.status(200).json(jsonResponse);
    } catch (error) {
      console.error("Error fetching user data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

};
