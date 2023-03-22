const axios = require("axios");
require("dotenv").config();
const fs = require("fs");

const apiKey = process.env.alphavantage_api_key; // Replace with your own Alpha Vantage API key

const startDate = "2022-02-01";
const endDate = "2022-02-28";
const symbol = "GBPUSD";
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
