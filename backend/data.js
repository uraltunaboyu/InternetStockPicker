const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataSchema = new Schema(
  {
    Symbol: {
      type: String,
      index: true
    },
    CompanyName: {
      type: String,
    },
    Rank: {
      type: Number
    },
    RankChange: Number,
    Date: {
      type: Date,
      index:true
    }
  }
);

module.exports = mongoose.model("Data", dataSchema);