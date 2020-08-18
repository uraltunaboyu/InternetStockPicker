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
const { json } = require('body-parser');
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

router.post('/getData', (req, res) => {
    const { firstDate, lastDate, names } = req.body;

    if(!firstDate || !lastDate || !names) {
        return res.json({
            success: false,
            error: "Invalid values provided",
            body: req.body
        })
    }

    let query = Data.find({date: {$gte: new Date(firstDate), $lte: new Date(lastDate)}, symbol: {$in: names}}).sort({date: 1})
    query.exec((err, companies) => {
        if (err) return res.json({success:false, error: err});
        return res.json({success:true, result:companies});
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
