const mongoose = require("mongoose");
//===================================
const transitSchema = new mongoose.Schema({
    title: String,
    start: String,
    description: String,
});

const transitModel = mongoose.model("transitData", transitSchema);

module.exports = transitModel;
