const memberModel = require("../models/profile");
const superAdminCreationValidation = require("../validation/superAdminCreation")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//==================================================

module.exports = {

  getMemberProfile: async (req, res) => {
    try {
      const userId = req?.userId
      console.log('========== userId =============>', userId);



      const userData = await memberModel.findOne({ _id: userId });

      if (!userData) {
        return res.status(404).json({ message: "User not found" });
      }

      const jsonResponse = {
        message: "User found successfully",
        user: userData,
      };

      res.status(200).json(jsonResponse);
    } catch (error) {
      console.error("Error fetching user data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },


  updateMemberProfile: async (req, res) => {
    try {
      console.log('      user location updating ........');

      const userId = req.userId; // Get the user ID from the request (assuming it's available in the request object)
      const { name, email, mobile } = req.body; // Extract the fields to be updated from the request body

      // Prepare the update object
      const updateData = {};
      if (name) updateData.name = name;
      if (email) updateData.email = email;
      if (mobile) updateData.mobile = mobile;

      // Update the user information
      const updatedUser = await memberModel.findByIdAndUpdate(
        userId,
        updateData,
        { new: true, runValidators: true } // Return the updated user and run validators
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "Member not found" });
      }

      res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Error updating user", error: error.message });
    }
  },






  dummyUserLiveLocationUpdate: async (req, res) => {
    try {
      console.log('      user location updating ........');
      
      const userId = '6710a7ecb4f5d1ba7192947e'; // Get the user ID from the request (assuming it's available in the request object)
      const { latitude, longitude } = req.body; // Extract the fields to be updated from the request body
      console.log('      latitude, longitude ........',latitude, longitude);
      

      
      // Prepare the update object
      const updateData = {};
      
      // Update the user information
      // Update the user's location
      const updatedUser = await memberModel.findByIdAndUpdate(
        userId, // Replace this with the actual member's userId
        {
          $set: {
            'location.coordinates': [longitude, latitude], // Use dot notation to update nested coordinates
            'location.updatedAt': Date.now(), // Update the timestamp when location changes
          },
        },
        // { new: true, runValidators: true } // Return /the updated document and ensure validation
      );
      console.log('      ho gaya update  ........');


      if (!updatedUser) {
        return res.status(404).json({ message:updatedUser });
      }

      res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Error updating user", error: error.message });
    }
  }






};
