const sosLogModel = require('../model/sosLog');
const axios  = require("axios");
const { updateLocation } = require('../service/socket');


module.exports = {


    getPlaces: async (req, res) => {
        try {
            const { placeQuery } = req.params; // Using req.query instead of req.params
    
            if (!placeQuery) {
                return res.status(400).json({ error: "Missing placeQuery parameter" });
            }
    
            const apiKey = process.env.GOOGLE_MAPS_API_KEY;
            if (!apiKey) {
                return res.status(500).json({ error: "Google Maps API key is missing" });
            }
    
            // Step 1: Search for the place and get `place_id`
            const searchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(placeQuery)}&key=${apiKey}`;
            const searchResponse = await axios.get(searchUrl);
    
            if (!searchResponse.data.results || searchResponse.data.results.length === 0) {
                return res.status(404).json({ error: "No place found" });
            }
    
            const firstResult = searchResponse.data.results[0];
            const placeId = firstResult.place_id;
    
            // Step 2: Get nearby places using place_id (via coordinates)
            const { lat, lng } = firstResult.geometry.location;
            const nearbyUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&key=${apiKey}`;
            const nearbyResponse = await axios.get(nearbyUrl);
    
            if (!nearbyResponse.data.results || nearbyResponse.data.results.length === 0) {
                return res.status(404).json({ error: "No nearby places found" });
            }
    
            // Step 3: Extract required data from nearby places
            const nearbyPlaces = nearbyResponse.data.results.map(place => ({
                locationName: place.name,
                coordinates: [place.geometry.location.lat, place.geometry.location.lng],
                formatted_address: place.vicinity || "Address not available"
            }));
    
            res.json({
                searchedPlace: {
                    locationName: firstResult.name,
                    coordinates: [lat, lng],
                    formatted_address: firstResult.formatted_address || "Address not available"
                },
                nearbyPlaces
            });
    
        } catch (error) {
            console.error("Error fetching places:", error.message);
            res.status(500).json({ error: "Error fetching places" });
        }
    }
       
}
