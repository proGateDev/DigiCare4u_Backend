const { required } = require("../user/validation/user");
const fs = require('fs');

const { almanacData, almanacData_d } = require('../utils/astro')
//==================================================

module.exports = {
  almanac: async (req, res) => {
    try {
      console.log('======================================= started');

      const date = req.body.date
      const time = req.body.time
      if (!date) {
        res.status(404).json({ 'message': 'provide date' });

      } else {

        let ccc = almanacData(date, time)

        jsonResponse = {
          status: 200,
          message: "Planetary position for a given date & time",
          data: await ccc,
        };

        res.status(200).json(jsonResponse);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  almanac_d: async (req, res) => {
    try {
      const dateTime = {
        date: "2023-1-3",
        time: "12:20"
      }

      const date = dateTime.date
      const time = dateTime.time

      const planet = req.body.planet
      const rashi = req.body.rashi

      let ccc = await almanacData_d(date, time, planet, rashi)
      console.log('ccc -----------------------', ccc.almanacDataaa_.data.data);

      jsonResponse = {
        status: 200,
        message: "Planetary position for a given date & time",
        data: await ccc.almanacDataaa_.data.data,
      };

      res.status(200).json(jsonResponse);
    } catch (error) {
      console.error("Error fetching user data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },



  almanac_df: async (req, res) => {
    try {
      const filePath = 'output.json';
      const planet = req.body.planet;
      const rashi = req.body.rashi;

      const transits = [];
      const startDate = new Date();
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 60);

      for (let currentDate = startDate; currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
        for (let hour = 0; hour < 24; hour++) {
          for (let minute = 0; minute < 60; minute++) {
            const currentTime = `${hour}:${minute}`;
            console.log('date ------------', currentDate.toISOString().split("T")[0], currentTime);

            const result = await almanacData_d(
              currentDate.toISOString().split("T")[0],
              currentTime,
              planet,
              rashi
            );
            const upTo = 0.5;

            if (
              result.almanacDataaa_.data.data.position.degree <= upTo &&
              result.almanacDataaa_.data.data.position.name === rashi
            ) {
              transits.push({
                date: currentDate.toISOString().split("T")[0],
                time: currentTime,
                position: result.almanacDataaa_.data.data.position
              });

              const jsonData = JSON.stringify(transits, null, 2);
              fs.writeFileSync(filePath, jsonData, 'utf-8');
              console.log('Data has been written to', filePath);

              // Return immediately after finding the first matching transit
              return res.status(200).json(transits);
            }
            break
          }
          
        }
        
      }

      // If no transit is found within the date range
      return res.status(200).json([]);
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }


}