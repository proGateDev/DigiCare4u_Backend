const PunchLog = require('../models/attendance');

// Punch-in for a member
const Attendance = require('../models/attendance'); // Import the attendance model

exports.markAttendance = async (req, res) => {
    try {
        const memberId = req.userId
        const { parentId, latitude, longitude } = req.body;
        console.log('req.body--------', parentId);

        // Get today's date (ignoring time)
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set to the beginning of the day

        // Find if there is an attendance record for the member for today
        const existingAttendance = await Attendance.findOne({
            memberId,
            parentId, // Also check for the parentId to ensure attendance is unique per member and user
            createdAt: { $gte: today } // Find attendance for today
        });

        if (existingAttendance) {
            // If attendance for today already exists, return an error
            return res.status(300).json({ message: 'Attendance already marked for today.' });
        }

        // If no attendance for today, create a new punch-in record
        const newPunchIn = new Attendance({
            memberId,
            parentId, // Include parentId when creating the new record
            punchInTime: new Date(),
            locationDuringPunchIn: { latitude, longitude }
        });

        await newPunchIn.save();
        console.log('========= Attednace Marked ==============================');

        return res.status(201).json({ message: 'Punch-in successful', data: newPunchIn });
    } catch (error) {
        console.error('Error during punch-in:', error); // Log the error for debugging
        return res.status(500).json({ message: 'Error during punch-in', error: error.message });
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
