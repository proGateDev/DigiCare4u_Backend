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

      // Assuming almanacData_d returns a Promise
      const transits = [];

      // Define the start and end dates of the range
      const startDate = new Date();  // You might want to replace this with the actual start date
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 60);  // Assuming a range of 365 days

      let foundTransit = false;

      // Iterate over the date range
      for (let currentDate = startDate; currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
        // Iterate over each minute of the day
        for (let hour = 0; hour < 24; hour++) {
          for (let minute = 0; minute < 60; minute++) {
            const currentTime = `${hour}:${minute}`;
            console.log('date ------------', currentDate.toISOString().split("T")[0],currentTime);
            // Call almanacData_d function
            const result = await almanacData_d(
              currentDate.toISOString().split("T")[0],
              currentTime,
              planet,
              rashi
            );

            // Check if the planetary position meets your criteria
            if (
              result.almanacDataaa_.data.data.position.degree === 0 &&
              result.almanacDataaa_.data.data.position.minute.toFixed(0) === 0 &&
              result.almanacDataaa_.data.data.position.name === rashi
            ) {
              // Store the transit details
              transits.push({
                date: currentDate.toISOString().split("T")[0],
                time: currentTime,
                position: result.almanacDataaa_.data.data.position
              });


              // Write to file only for the first matching transit
              // Convert array of objects to JSON string
              const jsonData = JSON.stringify(transits, null, 2); // The third parameter (2) is for indentation in the output JSON

              // Write JSON string to a file
              fs.writeFile(filePath, jsonData, 'utf-8', (err) => {
                if (err) {
                  console.error('Error writing to file:', err);
                } else {
                  console.log('Data has been written to', filePath);
                }
              });

            }
          }
        }
      }

      // Return the result after the loop is complete
      return res.status(200).json(transits);
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },


  // almanac_df: async (req, res) => {
  //   try {
  //     const filePath = 'output.json';

  //     const planet = req.body.planet;
  //     const rashi = req.body.rashi;

  //     // Assuming almanacData_d returns a Promise
  //     const transits = [];
  //     let foundTransit = false;

  //     // Define the start and end dates of the range
  //     const startDate = new Date();  // You might want to replace this with the actual start date
  //     const endDate = new Date(startDate);
  //     endDate.setDate(endDate.getDate() + 365);  // Assuming a range of 365 days
  //     // console.log('endDate ------->',  endDate.setDate(endDate.getDate() + 365));

  //     // Iterate over the date range
  //     for (let currentDate = startDate; currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
  //       // Iterate over each minute of the day
  //       for (let hour = 0; hour < 24; hour++) {
  //         for (let minute = 0; minute < 60; minute++) {
  //           const currentTime = `${hour}:${minute}`;

  //           // Call almanacData_d function
  //           const result = await almanacData_d(
  //             currentDate.toISOString().split("T")[0],
  //             currentTime,
  //             planet,
  //             rashi
  //           );

  //           // Check if the planetary position meets your criteria
  //           console.log('-----------------', currentDate.toISOString().split("T")[0] , currentTime);

  //           if (result.almanacDataaa_.data.data.position.degree == 0 &&
  //               Math.floor(result.almanacDataaa_.data.data.position.minute) == 0 &&
  //               result.almanacDataaa_.data.data.position.name === rashi  &&
  //               !foundTransit) {

  //             // Store the transit details
  //             transits.push({
  //               date: currentDate.toISOString().split("T")[0],
  //               time: currentTime,
  //               position: result.almanacDataaa_.data.data.position
  //             });
  //             foundTransit = true;  // Set the flag to true to prevent further writing

  //             const jsonData = JSON.stringify(transits, null, 2); // The third parameter (2) is for indentation in the output JSON

  //             fs.writeFile(filePath, jsonData, 'utf-8', (err) => {
  //               if (err) {
  //                 console.error('Error writing to file:', err);
  //               } else {
  //                 console.log('Data has been written to', filePath);
  //               }
  //             });
  //             // return
  //             console.log('transits ----', transits);
  //           }
  //         }
  //       }
  //     }

  //     // Return the result after the loop is complete
  //     return res.status(200).json(transits);
  //   } catch (error) {
  //     console.error("Error:", error);
  //     return res.status(500).json({ error: "Internal Server Error" });
  //   }
  // },

}
