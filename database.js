const mongoose = require("mongoose");
require("dotenv").config();
//===========================

const db = mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {

    console.log("-------------  --------------", process.env.DB)
    console.log("------------- Database got connected --------------", db)
})
module.exports = db;
