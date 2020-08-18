"use strict";

const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const fs = require('fs');
const logger = require('morgan');
const cors = require('cors');
const { json } = require('body-parser');
require('dotenv').config();


app.use(cors());
const router = express.Router();

const dbRoute = process.env.MONGO_URI;
mongoose.connect(dbRoute, {useNewUrlParser: true}).catch(err => console.log(err));


let db = mongoose.connection;

db.once('open', () => console.log('Database connection successful.'));
db.once('error', console.error.bind(console, 'MongoDB connection error.'));

let dataSchema = mongoose.model('parsedComments', new Schema(
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
  ));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(logger('dev'));

router.get('/getData', (req, res) => {
    dataSchema.find((err, comps) => {
        if (err) return res.json({success: false, error: err});
        return res.json({ success: true, data: comps})
    });
});

router.post('/getData', (req, res) => {
    const { firstDate, lastDate, names } = req.body;

    // if(!firstDate || !lastDate || !names) {
    //     return res.json({
    //         success: false,
    //         error: "Invalid values provided",
    //         body: req.body
    //     })
    // }

    let query = dataSchema.find({"symbol": "AMD"}).sort({date: 1})
    query.exec((err, companies) => {
        if (err) return res.json({success:false, error: err});
        return res.json({success:true, result:companies, names: names});
    })
})

app.use('/api', router);


app.use(express.static(path.join(__dirname, 'build')));


app.get('/', (req, res) => {
    res.sendFile(path.resolve('../frontend/public/index.html'));
});


app.use(function (req, res, next) {
    res.status(404).send("Sorry, can't find that!")
})


const port = 9000;
app.listen(port, () => console.log(`App listening at http://localhost:${port}`))
