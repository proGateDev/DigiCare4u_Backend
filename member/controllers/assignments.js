const memberModel = require("../models/profile");
const userModel = require("../../user/models/profile");
const superAdminCreationValidation = require("../validation/superAdminCreation")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const turf = require('@turf/turf');
const geojsonUtils = require('geojson-utils');
const assignmentModel = require("../../model/assignment");

//==================================================

module.exports = {
  memberHasGeoFencedSetup: async (req, res) => {
    try {
      const memberId = req.userId; // Assuming you get memberId from the request parameters

      // Check the assignmentModel for entries where type is 'geo-fenced' and memberId matches
      const geoFencedAssignment = await assignmentModel.findOne({
        memberId: memberId,
        type: 'geo-fenced',
      })

      if (!geoFencedAssignment) {
        return res.status(200).json({
          message: "No geo-fenced setup found for the member",
          data: {},
          status: 200,
          type: 'not-setup'
          
        });
      }

      res.status(200).json({
        message: "Geo-fenced setup retrieved successfully",
        data: geoFencedAssignment,
      });
    } catch (error) {
      console.error("Error fetching geo-fenced setup:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }






};
