const model = require("../models/profile");
const superAdminCreationValidation = require("../validation/superAdminCreation")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//==================================================

module.exports = {

  getMemberSubUsers: async (req, res) => {
    try {
      const memberId = req.params.memberId; // Assuming memberId is passed as a URL parameter
      console.log('========== memberId =============>', memberId);
      
      // Find the member using the memberId
      const memberData = await model.findOne({ _id: memberId }).populate('subMembers'); // Assuming 'subMembers' is the field containing the associated members
  
      if (!memberData) {
        return res.status(404).json({ message: "Member not found" });
      }
  
      const jsonResponse = {
        message: "Member found successfully",
        member: memberData,
      };
  
      res.status(200).json(jsonResponse);
    } catch (error) {
      console.error("Error fetching member data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  


};
