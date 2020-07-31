"use strict";

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const fs = require('fs');
const logger = require('morgan');
const Data = require('./data');
const cors = require('cors');
require('dotenv').config();


app.use(cors());
const router = express.Router();

const dbRoute = process.env.MONGO_URI;
mongoose.connect(dbRoute, {useNewUrlParser: true});


let db = mongoose.connection;

db.once('open', () => console.log('Database connection successful.'));
db.once('error', console.error.bind(console, 'MongoDB connection error.'));


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(logger('dev'));

router.get('/getData', (req, res) => {
    Data.find((err, data) => {
        if (err) return res.json({success: false, error: err});
        return res.json({ success: true, data: data})
    });
});

router.post('/putData', (req, res) => {
    let data = new Data();

    const { Symbol, CompanyName, Rank, RankChange } = req.body;

    if (!Symbol || !CompanyName || !Rank || !RankChange) {
        return res.json({
            success: false,
            error: req.body
        });
    }
    data.Symbol = Symbol;
    data.CompanyName = CompanyName;
    data.Rank = Rank;
    data.RankChange = RankChange;
    data.save(err => {
        if (err) return res.json({success: false, error: err});
        return res.json({success: true});
    })
});

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
