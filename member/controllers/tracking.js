const memberModel = require("../models/profile");
const trackingHistoryModel = require('../../model/trackingHistory'); // Update with the correct path
const getAddressFromCoordinates = require("../../service/geoCode");

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
    },

    // postMemberLocation: async (req, res) => {
    //     try {
    //         const memberId = req.userId; // Get the member ID from the request
    //         const { latitude, longitude } = req.body; // Extract latitude and longitude from the request body
    //         console.log('Location ---------- Member ID:', memberId, 'Latitude:', latitude, 'Longitude:', longitude);

    //         // Create a new location entry in the tracking history
    //         const newLocationHistory = new trackingHistoryModel({
    //             memberId, // Associate the location with the member ID
    //             location: {
    //                 type: 'Point',
    //                 coordinates: [longitude, latitude], // Store coordinates as [longitude, latitude]
    //             },
    //             locationStatus: 'active', // You can add this if it's part of your schema
    //         });

    //         // Save the new location history to the database
    //         await newLocationHistory.save();

    //         res.status(201).json({ message: 'Location posted successfully', location: newLocationHistory });
    //     } catch (error) {
    //         res.status(500).json({ message: 'Error posting location', error: error.message });
    //     }
    // },





    postMemberLocation: async (req, res) => {
        try {
            const memberId = req.userId; // Get the member ID from the request
            const { latitude, longitude } = req.body; // Extract latitude and longitude from the request body
            console.log('Location ---------- Member ID:', memberId, 'Latitude:', latitude, 'Longitude:', longitude);

            // Get formatted address from coordinates
            const addressDetails = await getAddressFromCoordinates(latitude, longitude);

            // Create a new location entry in the tracking history
            const newLocationHistory = new trackingHistoryModel({
                memberId, // Associate the location with the member ID
                location: {
                    type: 'Point',
                    coordinates: [longitude, latitude], // Store coordinates as [longitude, latitude]
                },
                // Add address details to the tracking history
                formattedAddress: addressDetails.formattedAddress,
                locality: addressDetails.locality,
                sublocality: addressDetails.sublocality,
                region: addressDetails.region,
                country: addressDetails.country,
                postalCode: addressDetails.postalCode,
                landmarks: addressDetails.landmarks,
                timestamp: new Date() // Optional: Use the current date and time
            });

            // Save the new location history to the database
            await newLocationHistory.save();

            res.status(201).json({
                message: 'Location posted successfully',
                location: newLocationHistory,
            });
        } catch (error) {
            res.status(500).json({ message: 'Error posting location', error: error.message });
        }
    },
    getMemberLocationsRecords: async (req, res) => {
        try {
            const memberId = req.userId; // Get the member ID from the request
            const { interval } = req.query; // Get the interval from the query parameters
            const currentDate = new Date();
            let dateLimit;

            // Determine the date limit based on the interval
            // switch (interval) {
            //     case '1day':
            //         dateLimit = new Date(currentDate.setHours(0, 0, 0, 0)); // Start of today
            //         break;
            //     case '7days':
            //         dateLimit = new Date(currentDate.setDate(currentDate.getDate() - 7)); // 7 days ago
            //         break;
            //     case '1month':
            //         dateLimit = new Date(currentDate.setMonth(currentDate.getMonth() - 1)); // 1 month ago
            //         break;
            //     default:
            //         return res.status(400).json({ message: "Invalid interval" });
            // }
            console.log('dateLimit', interval);

            // Fetch the member's tracking history sorted by timestamp
            const trackingHistory = await trackingHistoryModel
                .find({
                    memberId,
                    timestamp: { $gte: new Date(interval) },
                })
                .sort({ timestamp: -1 })
                .populate('assignmentId'); // Ensure this is correctly populated

            if (!trackingHistory || trackingHistory.length === 0) {
                return res.status(200).json({ message: "No locations found for this member" });
            }

            // Remove duplicates based on locality and keep the most recent record for each locality
            const localityMap = {};

            trackingHistory.forEach((location) => {
                const locality = location.addressDetails.locality || 'Unknown Locality';

                // If the locality hasn't been recorded yet or the current record is more recent
                if (!localityMap[locality] || location.timestamp > localityMap[locality].timestamp) {
                    localityMap[locality] = location; // Keep the latest record for the locality
                }
            });

            // Convert the localityMap to an array and add the count
            const filteredLocations = Object.values(localityMap).map((location) => {
                return {
                    locality: location.addressDetails.locality,
                    timestamp: location.timestamp,
                    trackingType: location.trackingType,
                    count: trackingHistory.filter(item => item.addressDetails.locality === location.addressDetails.locality).length,
                    assignmentName: location.trackingType === 'scheduled' ? location.assignmentId.eventName || 'No assignment name' : undefined
                };
            });

            // Return the filtered locations with count for locality
            res.status(200).json({
                message: "Locations fetched successfully",
                count: filteredLocations.length, // Return the array with only one record per locality
                filteredLocations,
            });
        } catch (error) {
            console.error("Error fetching locations:", error);
            res.status(500).json({ message: "Error fetching locations", error: error.message });
        }
    },





    getMemberLocationsRecordsForMap: async (req, res) => {
        try {
            const memberId = req.userId; // Get the member ID from the request
            const { interval } = req.query; // Get the interval from the query parameters
            // console.log('dateLimit---------------------------------------------------', interval);

            // Fetch the member's tracking history sorted by timestamp
            const trackingHistory = await trackingHistoryModel
                .find({
                    memberId,
                    timestamp: { $gte: new Date(interval) },
                })
                .sort({ timestamp: -1 })
                .populate('assignmentId'); // Ensure this is correctly populated

            if (!trackingHistory || trackingHistory.length === 0) {
                return res.status(200).json({ message: "No locations found for this member" });
            }

            // Remove duplicates based on locality and keep the most recent record for each locality
            const localityMap = {};

            trackingHistory.forEach((location) => {
                const locality = location.addressDetails.locality || 'Unknown Locality';

                // If the locality hasn't been recorded yet or the current record is more recent
                if (!localityMap[locality] || location.timestamp > localityMap[locality].timestamp) {
                    localityMap[locality] = location; // Keep the latest record for the locality
                }
            });

            // Convert the localityMap to an array and add the count and coordinates
            const filteredLocations = Object.values(localityMap).map((location) => {
                const coordinates= location.location.coordinates || {}; // Assuming coordinates are stored here
                // console.log('location.location.coordinates', location.location.coordinates);

                return {
                    locality: location.addressDetails.locality  ,
                    timestamp: location.timestamp,
                    trackingType: location.trackingType,
                    count: trackingHistory.filter(item => item.addressDetails.locality === location.addressDetails.locality).length,
                    assignmentName: location.trackingType === 'scheduled' ? location.assignmentId.eventName || 'No assignment name' : undefined,
                    coordinates: {
                        latitude:coordinates[0] || null,  // Include latitude if available, otherwise null
                        longitude: coordinates[1] || null // Include longitude if available, otherwise null
                    }
                };
            });

            // Return the filtered locations with count and coordinates
            res.status(200).json({
                message: "Locations fetched successfully",
                count: filteredLocations.length, // Return the array with only one record per locality
                mapData:filteredLocations,
            });
        } catch (error) {
            console.error("Error fetching locations:", error);
            res.status(500).json({ message: "Error fetching locations", error: error.message });
        }
    }






}
