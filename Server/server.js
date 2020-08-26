const express = require('express');
const JSONProvider = require('../DataProvider/JSONProvider').JSONProvider;
const app = express();
const port = 80;

app.listen(port, () => {
    console.log(`Example app listening at http://secret.covrt.co:${port}`);
});

const data = new JSONProvider;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/home', (req, res) => {
    res.send(data);
});

