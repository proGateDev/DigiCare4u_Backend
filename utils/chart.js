const axios = require("axios");
require("dotenv").config();
const fs = require("fs");

const apiKey = process.env.alphavantage_api_key; // Replace with your own Alpha Vantage API key


axios
  .get(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=gbpusd&interval=daily&apikey=${apiKey}`
  )
  .then((response) => {

    console.log( "========= 🪐",response.data);


  })
  .catch((error) => {
    console.log(error);
  });
