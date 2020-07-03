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

app.get('/404', function (req, res, next) {
    // trigger a 404 since no other middleware
    // will match /404 after this one, and we're not
    // responding here
    next();
});

app.get('/403', function (req, res, next) {
    // trigger a 403 error
    var err = new Error('not allowed!');
    err.status = 403;
    next(err);
});

app.get('/500', function (req, res, next) {
    // trigger a generic (500) error
    next(new Error('Server error? Oops.'));
});


app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
})

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.use(function (req, res, next) {
    res.status(404);

    res.format({
        html: function () {
            res.render('404', { url: req.url })
        },
        json: function () {
            res.json({ error: 'Not found' })
        },
        default: function () {
            res.type('txt').send('Not found')
        }
    })
});

app.use(function(err, req, res, next){
    // we may use properties of the error object
    // here and next(err) appropriately, or if
    // we possibly recovered from the error, simply next().
    res.status(err.status || 500);
    res.render('500', { error: err });
  });

const port = 8080;
app.listen(port, () => console.log(`App listening at http://localhost:${port}`))
