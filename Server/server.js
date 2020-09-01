const express = require('express');
const fs = require('fs');
const app = express();
const config = require('../data/config/config.js').configData;

var data;

if (config.storageType == 'JSON') data = require('../DataProvider/JSONProvider').JSONProvider;
else if (config.storageType == 'mongodb') data = require('../DataProvider/MongoDBProvider').MongoDBProvider;

const pass = require('passport');
const ls = require('passport-local').Strategy;
const helmet = require('helmet');
const path = require('path');
const port = 443;

app.use(helmet());

const server = app.listen(port, () => {
    console.log(`Example app listening at https://secret.covrt.co:${port}`);
});

const io = require('socket.io').listen(server);

io.on('connection', (socket) => {
    console.log(`New user detected: ${socket.client.id}`);
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'Web', 'home.html'));
});

app.get('/socket.io.js', (req, res) => {
    res.sendFile(path.join(__dirname, "../node_modules/socket.io-client/dist/socket.io.js"));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'Web', 'login.html'));
});

app.post('/login', pass.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));