const axios = require("axios");
const dayjs = require("dayjs");
const aspectData = require("../constants/content");
const model = require("../models/transit");
//==================================================
const apiKey = "MDFI1JR0I0S8DQSZ";

const chartDataApi = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=GBPUSD&https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=GBPUSD&apikey=${apiKey}apikey=${apiKey}`;

//www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=GBPUSD&apikey=YOUR_API_KEY&outputsize=compact&date=2023-03-01

module.exports = {
  //================ GET_CHART_DATA ===========================
  getChartData: async (req, res) => {
    let chartData = await axios.get(
      "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=GBPUSD&apikey=MDFI1JR0I0S8DQSZ"
    );
    let finedData = chartData?.data["Time Series (Daily)"];

    // const dataArray = Object.entries(finedData).map(([date, values]) => ({
    //   date,
    //   ...values,
    // }));

    // const planet = await model.find({ planet: req.query.planet });
    // const planetSign = req.query.sign;
    // const now = dayjs();
    // const month = now.month();

    // const planetTransit = planet[0]?.transit;
    // const data = planetTransit?.find((w) => {
    //   if (w.zodiac === planetSign) return w;
    // });

    // // if (typeof data === "undefined" || data.length == 0) {
    // //   return res
    // //     .status(404)
    // //     .json(`No transit this month for ${req.query.planet}`);
    // // }
    // //---------------------------------------------
    // const index = planetTransit?.indexOf(data);
    // let secondIndex = index - 1;
    // //---------------------------------------------
    // let from = planetTransit[secondIndex]?.date;
    // let to = planetTransit[index]?.date;

    // let finaleData = dataArray.filter((x) => {
    //   if (x.date <= to && x.date >= from) {
    //     return x;
    //   }
    // });

    // // console.log("Index", index);
    // // console.log("secondIndex", secondIndex);
    // console.log("finaleData", finaleData);

    //---------------------------------------------
    // res.status(200).json(finaleData.reverse());
    res.status(200).json(chartData.data);
  },
};
