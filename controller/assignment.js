const assignmentModel = require('../model/assignment');

module.exports = {
    assignment: async (req, res) => {
        try {
            console.log(' assigning this .......', req.body);

            const { memberId, userId, locationName, coordinates } = req.body;

            // Check if all required fields are provided
            if (!memberId || !userId || !locationName || !coordinates || !coordinates.lat || !coordinates.lng) {
                return res.status(400).json({ error: 'All fields are required' });
            }

            // Create a new assignment
            const newAssignment = new assignmentModel({
                memberId,
                userId,
                locationName,
                coordinates,
            });

            // Save the assignment to the database
            const savedAssignment = await newAssignment.save();
            res.status(201).json({
                message: 'Location assigned successfully',
                assignment: savedAssignment,
            });
        } catch (error) {
            console.error("Error assigning location:", error);
            res.status(500).json({ error: 'Failed to assign location' });
        }
    }
    ,
    getAssignment: async (req, res) => {
        try {

            const memberId = req?.userId
            console.log('getting assignments for ....');




            const memberAssignment = await assignmentModel.find({ memberId: memberId });

            if (!memberAssignment) {
                return res.status(404).json({ message: "User not found" });
            }

            const jsonResponse = {
                message: "Assignments found successfully",
                assignedLocations: memberAssignment,
            };

            res.status(200).json(jsonResponse);
        } catch (error) {
            console.error("Error fetching user data:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

}
