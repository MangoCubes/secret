const express = require('express');
const config = require('../data/config/config.js').configData;
const pass = require('../App/strategy').pass;

const http = require('http');
const fs = require('fs');

const helmet = require('helmet');
const path = require('path');

const port = 80;
const app = express();

app.use(helmet());

const server = http.createServer(app).listen(port, () => {
    console.log(`Example app listening at ${port}`);
});

const io = require('socket.io').listen(server);

var data = require('../App/DataProvider/DataProvider').dataProvider;

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