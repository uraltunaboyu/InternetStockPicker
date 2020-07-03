const express = require('express');
const app = express();
const path = require('path');

app.get('/', (req, res) => {
    res.sendFile(path.resolve('../frontend/index.html'));
});


const port = 8080;
app.listen(port, () => console.log(`App listening at http://localhost:${port}`))
