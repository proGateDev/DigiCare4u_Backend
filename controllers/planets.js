const planetModel = require("../models/planet");


//==================================================
module.exports = {
    //===============  GET ====================================
    getPlanet: async (req, res) => {
        try {
            const data = await planetModel.find({})
            console.log('-------- data ----------', data);
            res.status(200).json(data);
        } catch (error) {
            console.error('Error fetching user data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
}