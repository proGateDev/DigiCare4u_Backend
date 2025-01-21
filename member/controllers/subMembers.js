const trackingHistoryModel = require("../../model/trackingHistory");
const memberModel = require("../models/profile");
const superAdminCreationValidation = require("../validation/superAdminCreation")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//==================================================

module.exports = {
  getMemberSubUsers: async (req, res) => {
    try {
      const memberId = req.userId; // Assuming you get memberId from the request
  
      // Step 1: Find the member and populate the parentUser field
      const memberData = await memberModel.findOne({ _id: memberId }).populate("parentUser");
  
      if (!memberData) {
        return res.status(404).json({ message: "Member not found" });
      }
  
      const { channelId } = memberData;
  
      // Step 2: Find all team members in the same channel
      const team = await memberModel.find({ channelId }, "name mobile locationStatus");
  
      if (!team.length) {
        return res.status(404).json({ message: "No team members found" });
      }
  
      // Step 3: Fetch the latest tracking history for each team member
      const teamWithLastLocation = await Promise.all(
        team.map(async (member) => {
          const latestTracking = await trackingHistoryModel
            .findOne({ memberId: member._id })
            .sort({ updatedAt: -1 }) // Sort by updatedAt in descending order
            .select("addressDetails.locality timestamp"); // Only fetch location and updatedAt fields
  
          return {
            name: member.name,
            mobile: member.mobile,
            locationStatus: member.locationStatus,
            lastUpdated: latestTracking ? latestTracking?.timestamp : null,
            lastLocation: latestTracking ? latestTracking?.addressDetails?.locality : null,
          };
        })
      );
  
      // Step 4: Respond with the processed data
      res.status(200).json({
        message: "Team members retrieved successfully",
        team: teamWithLastLocation,
        count: teamWithLastLocation.length,
      });
    } catch (error) {
      console.error("Error fetching member colleagues:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },  



};
