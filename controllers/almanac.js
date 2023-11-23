const { required } = require("../user/validation/user");

const { almanacData } = require('../utils/astro')
//==================================================

module.exports = {
  almanac: async (req, res) => {
    try {
      // const data = await planetModel.find({});
      // console.log("-------- data ----------", data);
      let a = almanacData()
      console.log('aaya -------->', a);
      jsonResponse = {
        message: "user found successfully"
      };
      res.status(200).json(jsonResponse);
    } catch (error) {
      console.error("Error fetching user data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

};
