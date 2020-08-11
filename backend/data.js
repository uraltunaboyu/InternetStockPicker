const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataSchema = new Schema(
  {
    date: {
      type: Date,
      index: true
    },
    symbol: String,
    companyName: String,
    rank: Number,
    rankChange: Number,
    stockData: {
      stockOpen: Number,
      stockClose: Number,
      stockChangePercent: String,
      stockChangeDollar: String
    }
  }
);

module.exports = mongoose.model("Data", dataSchema);