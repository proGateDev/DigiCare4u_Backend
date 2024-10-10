const axios = require('axios');

// Function to get address components from latitude and longitude
const getAddressFromCoordinates = async (latitude, longitude) => {
    const googleMapsPlatformAPIKey = process.env.GOOGLE_MAPS_API_KEY; // Your API key
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${googleMapsPlatformAPIKey}`;

    try {
        const response = await axios.get(geocodeUrl);
        if (response.data.status === 'OK') {
            // Extract relevant address components
            const addressComponents = response.data.results[0].address_components;
            const formattedAddress = response.data.results[0].formatted_address;

            // Structure the response to include required fields
            const addressDetails = {
                formattedAddress: formattedAddress,
                locality: 'NOT FOUND', // Default value
                sublocality: 'NOT FOUND', // Default value
                region: 'NOT FOUND', // Default value
                country: 'NOT FOUND', // Default value
                postalCode: 'NOT FOUND' // Default value
            };

            // Loop through address components to find required fields
            addressComponents.forEach(component => {
                const types = component.types;
                if (types.includes('locality')) {
                    addressDetails.locality = component.long_name;
                }
                if (types.includes('sublocality')) {
                    addressDetails.sublocality = component.long_name;
                }
                if (types.includes('administrative_area_level_1')) {
                    addressDetails.region = component.long_name;
                }
                if (types.includes('country')) {
                    addressDetails.country = component.long_name;
                }
                if (types.includes('postal_code')) {
                    addressDetails.postalCode = component.long_name;
                }
            });

            return addressDetails;
        } else {
            throw new Error(`Geocoding error: ${response.data.status}`);
        }
    } catch (error) {
        console.error("Error fetching address:", error.message);
        throw new Error('Unable to fetch address');
    }
};

module.exports = getAddressFromCoordinates;
