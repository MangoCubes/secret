const express = require('express');
const config = require('../data/config/config.js').configData;
var data;

if (config.storageType == 'JSON') data = require('../DataProvider/JSONProvider').JSONProvider;
else if (config.storageType == 'mongodb') data = require('../DataProvider/MongoDBProvider').MongoDBProvider;

const app = express();
const pass = require('passport');
const ls = require('passport-local').Strategy;
const helmet = require('helmet');
const path = require('path');
const port = 80;

app.use(helmet());

app.listen(port, () => {
    console.log(`Example app listening at http://secret.covrt.co:${port}`);
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'Web', 'home.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'Web', 'login.html'));
});

app.post('/login', pass.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));
