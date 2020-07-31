const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DataSchema = new Schema(
  {
    Symbol: {
      type: String,
      unique: true,
      index: true
    },
    CompanyName: {
      type: String,
      unique: true
    },
    Rank: {
      type: Number,
      unique: true
    },
    RankChange: Number
  }
);

module.exports = mongoose.model("Data", DataSchema);