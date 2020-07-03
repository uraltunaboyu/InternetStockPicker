const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');


app.get('/', (req, res) => {
    res.sendFile(path.resolve('../frontend/index.html'));
});

app.get('/download/nasdaq', (req, res) => {

    fs.readFile(path.resolve('../data/nasdaq.json'), (err, json) => {
        let obj = JSON.parse(json);
        res.json(obj);
    });

});

app.get('/download/nyse', (req, res) => {

    fs.readFile(path.resolve('../data/nyse.json'), (err, json) => {
        let obj = JSON.parse(json);
        res.json(obj);
    });

});

app.get('/download/others', (req, res) => {

    fs.readFile(path.resolve('../data/others-listed.json'), (err, json) => {
        let obj = JSON.parse(json);
        res.json(obj);
    });

});

const port = 8080;
app.listen(port, () => console.log(`App listening at http://localhost:${port}`))
