
// Punch-in for a member
const Attendance = require('../models/attendance'); // Import the attendance model
const memberModel = require('../../member/models/profile'); // Import the attendance model
const assignmentModel = require('../../model/assignment'); // Import the attendance model
const attendanceModel = require('../models/attendance');
const trackingHistoryModel = require('../../model/trackingHistory');

exports.markAttendance = async (req, res) => {
    try {
        const memberId = req.userId;
        const { parentId, latitude, longitude } = req.body;
        const isWithinGeofence = true;

        // Get today's date (ignoring time)
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0); // Set to the start of the day (midnight)

        // Find assigned task for the member
        const assignedTask = await assignmentModel.findOne({
            memberId,
            type: 'geo-fenced'
        });

        if (!assignedTask) {
            return res.status(200).json({ message: 'No assigned task found for the member.' });
        }

        const { coordinates, time } = assignedTask;
        const [startTime, endTime] = time.split('-').map(t => {
            const [hours, minutes] = t.split(':').map(Number);
            const parsedTime = new Date();
            parsedTime.setHours(hours, minutes, 0, 0); // Set hours and minutes
            return parsedTime;
        });

        const currentTime = new Date();
        const startGraceTime = new Date(startTime);
        startGraceTime.setMinutes(startTime.getMinutes() + 360); // Grace period for punch-in (6 hours)

        const endGraceTime = new Date(endTime);
        endGraceTime.setMinutes(endTime.getMinutes() + 60); // Grace period for punch-out (1 hour)

        const location = {
            type: 'Point',
            coordinates: [longitude, latitude], // Ensure [longitude, latitude] order
        };

        // Query to find attendance records created after the start of today
        const attendanceToday = await attendanceModel.findOne({
            memberId,
            parentId,
            createdAt: { $gte: startOfToday },
        });

        let punchInRecorded = false;
        let punchOutRecorded = false;

        // Check if attendance record exists
        if (attendanceToday) {
            // Punch-in logic
            if (isWithinGeofence && !attendanceToday.punchInTime && currentTime >= startTime && currentTime <= startGraceTime) {
                punchInRecorded = true;

                // Update existing attendance record with punch-in time
                await attendanceModel.findOneAndUpdate(
                    { memberId, createdAt: { $gte: startOfToday } },
                    { $set: { punchInTime: currentTime } }
                );
            }

            // Punch-out logic
            if (isWithinGeofence && attendanceToday.punchInTime && !attendanceToday.punchOutTime && currentTime >= endTime && currentTime <= endGraceTime) {
                punchOutRecorded = true;

                // Update existing attendance record with punch-out time
                await attendanceModel.findOneAndUpdate(
                    { memberId, createdAt: { $gte: startOfToday } },
                    { $set: { punchOutTime: currentTime } }
                );
            }
        } else {
            // If no attendance record exists, handle punch-in logic
            if (isWithinGeofence && currentTime >= startTime && currentTime <= startGraceTime) {
                punchInRecorded = true;

                // Create a new attendance record with punch-in time
                const newAttendance = new attendanceModel({
                    memberId,
                    parentId,
                    punchInTime: currentTime,
                });
                await newAttendance.save();
            }
        }

        // Handle the live location tracking history for the assigned task
        const trackingData = {
            memberId,
            location,
            addressDetails: "", // Add logic to fetch address details if needed
            timestamp: currentTime,
            trackingType: 'geo-fenced',
            isWithinGeofence,
            punchInTime: punchInRecorded ? currentTime : null,
            punchOutTime: punchOutRecorded ? currentTime : null,
        };

        const trackingHistory = new trackingHistoryModel(trackingData);
        await trackingHistory.save();

        return res.status(201).json({
            message: 'Attendance and live location updated successfully.',
            attendanceDetails: {
                punchInRecorded: {
                    punchInTime: attendanceToday?.punchInTime || (punchInRecorded ? currentTime : null),
                },
                punchOutRecorded: {
                    punchOutTime: attendanceToday?.punchOutTime || (punchOutRecorded ? currentTime : null),
                },
            }
        });
    } catch (error) {
        console.error('Error during attendance check:', error); // Log the error for debugging
        return res.status(500).json({ message: 'Error during attendance check', error: error.message });
    }
};






exports.getAttendanceRecords_old = async (req, res) => {
    try {
        const { startDate, endDate } = req.params; // Extract the date range from route parameters
        const memberId = req.userId; // Extract the member ID from the authenticated user token
        console.log('startDate:', startDate, 'endDate:', endDate, 'memberId:', memberId);

        if (!startDate || !endDate) {
            return res.status(400).json({ message: 'Start date and end date parameters are required.' });
        }

        // Fetch the parent user (parentId) for the given memberId
        const member = await memberModel.findById(memberId).select('parentUser'); // Assuming 'parentUser' is the field name
        if (!member || !member.parentUser) {
            return res.status(404).json({ message: 'Parent user not found for the given member.' });
        }

        const parentId = member.parentUser; // Extract the parentId
        console.log('ParentId:', parentId);

        // Parse the date range for filtering
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0); // Start of the day
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999); // End of the day

        // Fetch attendance records for the given date range and parentId
        const attendanceRecords = await Attendance.find({
            memberId, // Filter by memberId
            parentId, // Match with parentId
            punchInTime: {
                $gte: start,
                $lte: end,
            },
        })
            // .populate('memberId', 'name email') // Populate member details if required
            .sort({ punchInTime: -1 }); // Sort by punch-in time, latest first

        console.log('attendanceRecords:', attendanceRecords);

        if (attendanceRecords.length === 0) {
            return res.status(404).json({ message: 'No attendance records found for the given date range.' });
        }

        return res.status(200).json({
            message: 'Attendance records retrieved successfully.',
            count: attendanceRecords.length,
            data: attendanceRecords,
        });
    } catch (error) {
        console.error('Error fetching attendance records:', error); // Log the error for debugging
        return res.status(500).json({ message: 'Error fetching attendance records', error: error.message });
    }
};


exports.getAttendanceRecords = async (req, res) => {
    try {
        const { startDate, endDate } = req.params; // Extract the date range from route parameters
        const memberId = req.userId; // Extract the member ID from the authenticated user token
        console.log('startDate:', startDate, 'endDate:', endDate, 'memberId:', memberId);

        if (!startDate || !endDate) {
            return res.status(400).json({ message: 'Start date and end date parameters are required.' });
        }

        // Fetch the parent user (parentId) for the given memberId
        const member = await memberModel.findById(memberId).select('parentUser'); // Assuming 'parentUser' is the field name
        if (!member || !member.parentUser) {
            return res.status(404).json({ message: 'Parent user not found for the given member.' });
        }

        const parentId = member.parentUser; // Extract the parentId
        console.log('ParentId:', parentId);

        // Parse the date range for filtering
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0); // Start of the day
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999); // End of the day

        // Fetch attendance records for the given date range and parentId
        const attendanceRecords = await Attendance.find({
            memberId, // Filter by memberId
            parentId, // Match with parentId
            punchInTime: {
                $gte: start,
                $lte: end,
            },
        })
            .sort({ punchInTime: -1 }); // Sort by punch-in time, latest first

        console.log('attendanceRecords:', attendanceRecords);

        // Prepare response for each day in the date range
        const response = [];
        const currentDate = new Date(start);

        while (currentDate <= end) {
            const dateStr = currentDate.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
            const recordForDate = attendanceRecords.find((record) => {
                const recordDate = new Date(record.punchInTime).toISOString().split('T')[0];
                return recordDate === dateStr;
            });

            if (recordForDate) {
                response.push({
                    date: dateStr,
                    status: 'present',
                    punchInTime: recordForDate.punchInTime,
                    punchOutTime: recordForDate.punchOutTime,
                    otherFields: recordForDate.otherFields, // Add other necessary fields
                });
            } else {
                response.push({
                    date: dateStr,
                    status: 'absent',
                });
            }

            // Move to the next day
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return res.status(200).json({
            message: 'Attendance records retrieved successfully.',
            count: response.length,
            data: response,
        });
    } catch (error) {
        console.error('Error fetching attendance records:', error); // Log the error for debugging
        return res.status(500).json({ message: 'Error fetching attendance records', error: error.message });
    }
};
