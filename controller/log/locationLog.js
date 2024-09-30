const LocationLog = require('../models/locationLog');

// Log location update for a member
exports.logLocation = async (req, res) => {
    try {
        const { memberId, latitude, longitude, status } = req.body;
        const newLocationLog = new LocationLog({
            memberId,
            location: { latitude, longitude },
            status
        });
        await newLocationLog.save();
        return res.status(201).json({ message: 'Location logged', data: newLocationLog });
    } catch (error) {
        return res.status(500).json({ message: 'Error logging location', error });
    }
};

// Get location logs for a member
exports.getLocationLogs = async (req, res) => {
    try {
        const { memberId } = req.params;
        const locationLogs = await LocationLog.find({ memberId }).sort({ createdAt: -1 });
        return res.status(200).json({ data: locationLogs });
    } catch (error) {
        return res.status(500).json({ message: 'Error retrieving location logs', error });
    }
};
