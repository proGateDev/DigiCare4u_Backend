const memberModel = require("../models/profile");
const superAdminCreationValidation = require("../validation/superAdminCreation")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//==================================================

module.exports = {

    updateMemberLocation: async (req, res) => {
        const memberId = req?.userId
        const { latitude, longitude } = req.body;
        console.log('-------- memberId --->',memberId);

        try {
            // Validate request body for latitude and longitude
            if (!(latitude && longitude)) {
                return res.status(400).json({
                    status: 400,
                    message: "Latitude and  Longitude is required"
                });
            }


            const member = await memberModel.findById({ _id: memberId });


            if (!member) {
                return res.status(404).json({ message: "Member not found" });
            }

            // Update the location and updatedAt
            member.location.latitude = latitude;
            member.location.longitude = longitude;
            member.location.updatedAt = Date.now();

            // Save the updated member data
            await member.save();

            return res.status(200).json({ message: "Location updated successfully", member });
        } catch (error) {
            console.error("Error updating location:", error);
            return res.status(500).json({ message: "Server error", error });
        }
    }

}
