const PunchLog = require('../models/punchLog');

// Punch-in for a member
exports.punchIn = async (req, res) => {
    try {
        const { memberId, latitude, longitude } = req.body;
        const newPunchIn = new PunchLog({
            memberId,
            punchInTime: new Date(),
            locationDuringPunchIn: { latitude, longitude }
        });
        await newPunchIn.save();
        return res.status(201).json({ message: 'Punch-in successful', data: newPunchIn });
    } catch (error) {
        return res.status(500).json({ message: 'Error during punch-in', error });
    }
};

// Punch-out for a member
exports.punchOut = async (req, res) => {
    try {
        const { memberId, latitude, longitude } = req.body;
        const punchLog = await PunchLog.findOne({ memberId, punchOutTime: null });
        if (!punchLog) {
            return res.status(400).json({ message: 'No active punch-in session found' });
        }
        punchLog.punchOutTime = new Date();
        punchLog.locationDuringPunchOut = { latitude, longitude };
        punchLog.totalWorkHours = (punchLog.punchOutTime - punchLog.punchInTime) / (1000 * 60 * 60); // Calculate hours
        await punchLog.save();
        return res.status(200).json({ message: 'Punch-out successful', data: punchLog });
    } catch (error) {
        return res.status(500).json({ message: 'Error during punch-out', error });
    }
};

// Get punch logs for a member
exports.getPunchLogs = async (req, res) => {
    try {
        const { memberId } = req.params;
        const punchLogs = await PunchLog.find({ memberId });
        return res.status(200).json({ data: punchLogs });
    } catch (error) {
        return res.status(500).json({ message: 'Error retrieving punch logs', error });
    }
};
