const assignmentModel = require("../../model/assignment");
const trackingHistoryModel = require("../../model/trackingHistory");
const getAddressFromCoordinates = require("../../service/geoCode");
const userModel = require("../../user/models/profile");
const attendanceModel = require("../models/attendance");
const memberModel = require("../models/profile");
const superAdminCreationValidation = require("../validation/superAdminCreation")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//==================================================
// const turf = require('@turf/turf');


function isPointWithinGeofence(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // Radius of the earth in meters
  const dLat = (lat2 - lat1) * Math.PI / 180; // Convert degrees to radians
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in meters
  return distance; // This will be in meters
};



//==================================================



module.exports = {

  getMemberProfile: async (req, res) => {
    try {
      const userId = req?.userId
      // console.log('========== userId =============>', userId);



      const userData = await memberModel.findOne({ _id: userId });

      if (!userData) {
        return res.status(404).json({ message: "User not found" });
      }

      const jsonResponse = {
        message: "User found successfully",
        member: userData,
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





  // Update or create location history for a scheduled assignment
  userLiveLocationAssignmentUpdate: async (req, res) => {
    try {
      const memberId = req.userId; // Get the user ID from the request (assuming it's available in the request object)
      // console.log('userLiveLocationAssignmentUpdate ', memberId, req.userId);

      const {
        latitude,
        longitude,
        addressDetails,
        assignmentId,
        notes
      } = req.body;

      // if (!assignmentId || !memberId || !userId || !location || !location.coordinates) {
      //   return res.status(400).json({ error: 'Missing required fields' });
      // }

      // Ensure assignment exists
      // const assignment = await assignmentModel.findById(assignmentId);
      // if (!assignment) {
      //   return res.status(404).json({ error: 'Assignment not found' });
      // }

      // Ensure member exists
      const member = await memberModel.findById(memberId);
      if (!member) {
        return res.status(404).json({ error: 'Member not found' });
      }

      // Ensure user exists
      // const user = await userModel.findById(userId);
      // if (!user) {
      //   return res.status(404).json({ error: 'User not found' });
      // }
      const location = {
        type: 'Point',
        coordinates: [latitude, longitude], // Ensure [longitude, latitude] order
      };

      // Create or update tracking history for the assignment
      const trackingData = {
        memberId,
        // userId,
        location,
        addressDetails: {
          preferredAddress: addressDetails?.preferredAddress || 'NOT FOUND',
          address: addressDetails?.address || 'NOT FOUND',
          locality: addressDetails?.locality || 'NOT FOUND',
          street: addressDetails?.street || 'NOT FOUND',
          neighborhood: addressDetails?.neighborhood || 'NOT FOUND',
          region: addressDetails?.region || 'NOT FOUND',
          district: addressDetails?.district || 'NOT FOUND',
          country: addressDetails?.country || 'NOT FOUND',
          postcode: addressDetails?.postcode || 'NOT FOUND',
          landmarks: addressDetails?.landmarks || [],
        },
        timestamp: new Date(),
        trackingType: 'scheduled',
        assignmentId,
        notes: notes || '',
        isWithinGeofence: false, // Default; update logic for geofence if applicable
      };

      // Save the tracking history
      const trackingHistory = new trackingHistoryModel(trackingData);
      await trackingHistory.save();

      res.status(201).json({
        message: 'Tracking history updated successfully',
        trackingHistory,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },


  // userLiveLocationUpdate: async (req, res) => {
  //   try {
  //     const memberId = req.userId; // Get the user ID from the request (assuming it's available in the request object)

  //     const {
  //       latitude,
  //       longitude,
  //       addressDetails,
  //       notes
  //     } = req.body;

  //     // Ensure the member exists
  //     const member = await memberModel.findById(memberId);
  //     if (!member) {
  //       return res.status(404).json({ error: 'Member not found' });
  //     }

  //     // Create the location object
  //     const location = {
  //       type: 'Point',
  //       coordinates: [latitude,longitude ], // Ensure [longitude, latitude] order
  //     };

  //     // Create or update tracking history for the live location
  //     const trackingData = {
  //       memberId,
  //       location,
  //       addressDetails: {
  //         preferredAddress: addressDetails?.preferredAddress || 'NOT FOUND',
  //         address: addressDetails?.address || 'NOT FOUND',
  //         locality: addressDetails?.locality || 'NOT FOUND',
  //         street: addressDetails?.street || 'NOT FOUND',
  //         neighborhood: addressDetails?.neighborhood || 'NOT FOUND',
  //         region: addressDetails?.region || 'NOT FOUND',
  //         district: addressDetails?.district || 'NOT FOUND',
  //         country: addressDetails?.country || 'NOT FOUND',
  //         postcode: addressDetails?.postcode || 'NOT FOUND',
  //         landmarks: addressDetails?.landmarks || [],
  //       },
  //       timestamp: new Date(),
  //       trackingType: 'live',
  //       notes: notes || '',
  //       isWithinGeofence: false, // Default; update logic for geofence if applicable
  //     };

  //     // Save the tracking history
  //     const trackingHistory = new trackingHistoryModel(trackingData);
  //     await trackingHistory.save();

  //     res.status(201).json({
  //       message: 'Live location updated successfully',
  //       trackingHistory,
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: 'Internal server error' });
  //   }
  // },



  userLiveLocationUpdate: async (req, res) => {
    try {

      const memberId = req.userId; // Get the user ID from the request (assuming it's available in the request object)
      const { latitude, longitude, addressDetails, notes } = req.body;

      // Ensure the member exists
      const member = await memberModel.findById(memberId);
      if (!member) {
        return res.status(404).json({ error: 'Member not found' });
      }

      // Fetch assigned geofence and punch-out time for the member
      const assignedTask = await assignmentModel.findOne({
        memberId,
        type: 'geo-fenced'
      });
      if (!assignedTask) {
        return res.status(404).json({ error: 'No assigned task with geofence found for the member' });
      }

      const { coordinates, time } = assignedTask;

      // Create the location object
      const location = {
        type: 'Point',
        coordinates: [longitude, latitude], // Ensure [longitude, latitude] order
      };

      // const geofence = {
      //   type: 'Point',
      //   coordinates: [coordinates.lng, coordinates.lat], // Ensure [longitude, latitude] order
      // };

      // Check if the member is within the geofence
      const isWithinGeofence = isPointWithinGeofence(latitude, longitude, coordinates.lat, coordinates.lng);

      // Determine if punch-out conditions are met
      const currentTime = new Date();
      let punchOutRecorded = false;

      // Parse punch-out time from the `time.split('-')[1]`
      const punchOutTimeString = time.split('-')[1]; // Assuming the format is 'HH:mm'
      const [hours, minutes] = punchOutTimeString.split(':').map(Number); // Extract hours and minutes

      // Create a Date object for today's punch-out time
      const punchOutTime = new Date(currentTime);
      punchOutTime.setHours(hours, minutes, 0, 0); // Set punch-out hours and minutes to today's date

      // Add 15 minutes to the punch-out time for grace period
      const punchOutGraceTime = new Date(punchOutTime);
      punchOutGraceTime.setMinutes(punchOutTime.getMinutes() + 30);

      console.log('currentTime:', currentTime);
      console.log('punchOutTime:', punchOutTime);
      console.log('punchOutGraceTime:', punchOutGraceTime, isWithinGeofence);

      // Check if current time has exceeded the punch-out time (including grace period)
      // Check if current time has exceeded the punch-out time (including grace period)
      if (isWithinGeofence < 20 && currentTime >= punchOutTime && currentTime <= punchOutGraceTime) {
        punchOutRecorded = true;
        
        // Update the attendance record for the member for today
        const todayDate = new Date();
        console.log('Punch-out conditions met');
        todayDate.setHours(0, 0, 0, 0); // Set to start of the day

        const _punchOutUpdate = await attendanceModel.findOne({
          memberId: req.userId, // Match the member
          punchInTime: { $lt: todayDate }, // Ensure punchInTime is less than todayDate
          // punchInTime: todayDate, // Ensure it's for today
        },)
        // console.log('_punchOutUpdate',_punchOutUpdate,assignedTask?.id);
        const punchOutUpdate = await attendanceModel.findOneAndUpdate(
          {
            // _id: assignedTask._id,
            memberId: req.userId, // Match the member
            punchInTime: { $gt: todayDate }, // Ensure punchInTime is less than todayDate
          },
          {
            $set: { punchOutTime: currentTime }, // Update the punch-out time
          },

        );

        console.log('Updated attendance record:', punchOutUpdate);
      }

      console.log('Punch-out recorded:', punchOutRecorded);


      // Create or update tracking history for the live location
      const trackingData = {
        memberId,
        location,
        addressDetails: {
          preferredAddress: addressDetails?.preferredAddress || 'NOT FOUND',
          address: addressDetails?.address || 'NOT FOUND',
          locality: addressDetails?.locality || 'NOT FOUND',
          street: addressDetails?.street || 'NOT FOUND',
          neighborhood: addressDetails?.neighborhood || 'NOT FOUND',
          region: addressDetails?.region || 'NOT FOUND',
          district: addressDetails?.district || 'NOT FOUND',
          country: addressDetails?.country || 'NOT FOUND',
          postcode: addressDetails?.postcode || 'NOT FOUND',
          landmarks: addressDetails?.landmarks || [],
        },
        timestamp: currentTime,
        trackingType: 'live',
        notes: notes || '',
        isWithinGeofence: isWithinGeofence ? true : false,
        punchOutTime: punchOutRecorded ? currentTime : null, // Record punch-out time if conditions are met
      };

      // Save the tracking history
      const trackingHistory = new trackingHistoryModel(trackingData);
      await trackingHistory.save();

      res.status(201).json({
        message: 'Live location updated successfully',
        trackingHistory,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },








};
