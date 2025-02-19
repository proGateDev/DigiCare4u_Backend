const userModel = require("../../user/models/profile");
const memberModel = require("../../member/models/profile");

//==================================================

module.exports = {



  getAllUsers: async (req, res) => {
    try {
      const data = await userModel.find({});
      console.log("-------- data ----------", data);
      jsonResponse = {
        message: "user found successfully",
        data,
        count: data.length,
      };
      res.status(200).json(jsonResponse);
    } catch (error) {
      console.error("Error fetching user data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },


  getUserById: async (req, res) => {
    try {
      const { userId } = req.params;

      const data = await userModel.findOne({ _id: userId });
      // console.log("-------- data ----------", data);
      jsonResponse = {
        message: "user found successfully",
        data,
        count: data.length,
      };
      res.status(200).json(jsonResponse);
    } catch (error) {
      console.error("Error fetching user data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },





  getUserMembers: async (req, res) => {
    try {
      const { userId } = req.params;

      const data = await memberModel.find({parentUser:userId});
      console.log("-------- data ----------", data);
      jsonResponse = {
        message: "user found successfully",
        count: data?.length,
        members:data,
      };
      res.status(200).json(jsonResponse);
    } catch (error) {
      console.error("Error fetching user data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },










};
