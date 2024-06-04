const { required } = require("../user/validation/user");
const fs = require('fs');
const { Worker, isMainThread, parentPort } = require('worker_threads');
const moonJson = require('../transitJson/moon.json')
const mercuryJson = require('../transitJson/mercury.json')
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


      async function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }


      const filePath = `${req.body.planet}_new.json`;
      const planet = req.body.planet;
      const rashi = req.body.rashi;
      // const zodiacSigns = ["pisces",
      //   "aries",
      //   "taurus",
      //   "gemini",
      //   "cancer",
      //   "leo",
      //   "virgo",
      //   "libra",
      //   "scorpio",
      //   "sagittarius",
      //   "capricorn",
      //   "aquarius"
      // ];

      const zodiacSigns = [

        "taurus",
        "gemini",
        "cancer",
        "leo",
        "virgo",
        "libra",
        "scorpio",
        "sagittarius",
        "capricorn",
        "aquarius",
        "pisces",
        "aries"
      ];
      // const zodiacSigns = ["pisces", "aries"];

      const transits = [];
      const startDate = new Date();
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 365);

      // Initialize flags for each zodiac sign
      const foundTransits = {};
      zodiacSigns.forEach(sign => {
        foundTransits[sign] = false;
      });
      // console.log('zodiacSigns =======', zodiacSigns);

      let i = 0
      let startDateNew = new Date("2024-05-31")
      // console.log('---- startDateNew---------------', startDateNew);
      const upToDegree = 0; // Adjust this degree if needed
      for (let currentDate = startDateNew; currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {

        for (let hour = 0; hour < 24; hour++) {
          // console.log('-------- after break -----------------');
          // await sleep(2000);

          for (let minute = 0; minute < 60; minute = minute + 20) {
            const currentTime = `${hour}:${minute}`;

            const result = await almanacData_d(
              currentDate.toISOString().split("T")[0],
              currentTime,
              planet,
              rashi
            );
            console.log(`date : ${currentDate.toISOString().split("T")[0]},${currentTime}\n position : ${result.almanacDataaa_.data.data.position.degree}:  ${result.almanacDataaa_.data.data.position.minute} `)
            console.log('---- signddd --------', result.almanacDataaa_.data.data.position.name);
            if (
              result.almanacDataaa_.data.data.position.degree == upToDegree &&
              result.almanacDataaa_.data.data.position.name === zodiacSigns[i]
            ) {
              console.log('---- FOUND --------', zodiacSigns[i]);
              transits.push({
                date: currentDate.toISOString().split("T")[0],
                time: currentTime,
                position: result.almanacDataaa_.data.data.position,
                zodiacSign: zodiacSigns[i]
              });

              i = i + 1
              console.log('---- here we are top -----------');
              if (i == zodiacSigns.length) {
                i = 0
              }
              await sleep(1000);
              // foundTransits[sign] = true; // Mark transit as found
              break; // Stop checking further for this sign
            }
            // if (foundTransits[sign]) break; // Stop checking further for this sign
          }
          // if (foundTransits[sign]) break; // Stop checking further for this sign
        }
        console.log('---- here we are -----------');
        if (i == 0) break


        // if (foundTransits[sign]) break; // Stop checking further for this sign
      }
      const jsonData = JSON.stringify(transits, null, 2);
      fs.writeFileSync(filePath, jsonData, 'utf-8');
      console.log('Data has been written to', filePath);
      return res.status(200).json(transits);
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },


  almanac_planet_transit: async (req, res) => {
    try {

      planetTransitJsonList = {
        'moon': moonJson,
        'mercury': mercuryJson,
      }
      console.log('----- param ----',req.query.planet);
      return res.status(200).json(planetTransitJsonList[req.query.planet]);
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },


  almanac_df_1: async (req, res) => {
    console.log('-------- STARTED -----------------');

    const filePath = `${req.body.planet}.json`;
    const planet = req.body.planet;
    const rashi = req.body.rashi;
    const worker = new Worker(__filename);

    worker.postMessage({ planet, rashi });

    worker.on('message', (transits) => {
      console.log('-------- STARTED AGAIN  -----------------');

      const filePath = 'output.json';
      const zodiacSigns = ["aries", "taurus", "gemini", "cancer", "leo", "virgo", "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"];

      const startDate = new Date();
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 365);

      let i = 0;
      const upToDegree = 0; // Adjust this degree if needed
      for (let currentDate = new Date(); currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
        for (let hour = 0; hour < 24; hour++) {
          for (let minute = 0; minute < 60; minute++) {
            const currentTime = `${hour}:${minute}`;
            let result = getAlmanacData_d(currentDate.toISOString().split("T")[0], currentTime, planet, rashi);
            if (
              result.almanacDataaa_.data.data.position.degree == upToDegree &&
              result.almanacDataaa_.data.data.position.name === zodiacSigns[i]
            ) {
              transits.push({
                date: currentDate.toISOString().split("T")[0],
                time: currentTime,
                position: result.almanacDataaa_.data.data.position,
                zodiacSign: zodiacSigns[i]
              });

              i++;
              if (i == zodiacSigns.length) {
                i = 0;
              }
            }
          }
        }
      }

      const jsonData = JSON.stringify(transits, null, 2);
      fs.writeFileSync(filePath, jsonData, 'utf-8');
      console.log('Data has been written to', filePath);
      return res.status(200).json(transits);
    });

    worker.on('error', (err) => {
      console.error('Worker error:', err);
      if (!isMainThread) {
        parentPort.on('message', async ({ planet, rashi }) => {
          console.log('Worker received message:', { planet, rashi });
          const transits = await yourAsyncFunction(planet, rashi);
          console.log('Worker sending transits:', transits);
          parentPort.postMessage(transits);
        })
      }
    });
  }




}