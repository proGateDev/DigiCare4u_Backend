const memberModel = require("../models/profile");
const trackingHistoryModel = require('../../model/trackingHistory'); // Update with the correct path

//==================================================

module.exports = {

    updateMemberLocation: async (req, res) => {
        try {
            const memberId = req.userId;
            const { latitude, longitude } = req.body;
            console.log('locatin ----------memberId ', latitude, longitude, memberId);

            // Update the member's location
            const updatedMember = await memberModel.findByIdAndUpdate(
                memberId,
                {
                    location: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    locationStatus: 'active',
                },
                { new: true }
            );

            // Save to tracking history
            const newLocationHistory = new trackingHistoryModel({
                memberId,
                location: {
                    type: 'Point',
                    coordinates: [longitude, latitude],
                },
            });
            await newLocationHistory.save();

            res.status(200).json({ message: 'Location updated successfully', member: updatedMember });
        } catch (error) {
            res.status(500).json({ message: 'Error updating location', error: error.message });
        }
    }
}
