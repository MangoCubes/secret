const express = require('express');
const config = require('../data/config/config.js').configData;
var session = require('express-session');

const https = require('https');
const fs = require('fs');

const helmet = require('helmet');
const path = require('path');

const options = {
    key: fs.readFileSync(path.join(__dirname, '../data/config/certs/key.key')),
    cert: fs.readFileSync(path.join(__dirname, '../data/config/certs/cert.crt'))
};

const Logger = require('../App/Logger').Logger;
const log = new Logger('../data/Logs');

const port = 443;
const app = express();

app.use(session({ //Add session storage later, npm install connect-session-sequelize
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

app.use(helmet());

const server = https.createServer(options, app).listen(port, () => {
    console.log(`Example app listening at ${port}`);
});

const io = require('socket.io').listen(server);

var data = require('../App/DataProvider/DataProvider').dataProvider;

io.on('connection', (socket) => {
    console.log(`New user detected: ${socket.client.id}`);
    var address = socket.handshake.address;
    log.connection(toString(address.address) + toString(address.port));
});

app.get('/', (req, res) => {
    res.send('Hello World!');
    console.log(req.session);
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

app.post('/login', (req, res) => {

});