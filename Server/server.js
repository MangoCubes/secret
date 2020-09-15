const express = require('express'); //Web server
const config = require('../data/config/config.js').configData;
var session = require('express-session'); //Session middleware for storing session and keeping user logged in

const https = require('https'); //HTTPS
const fs = require('fs'); //File system to access certs

const helmet = require('helmet'); //Security practice
const path = require('path'); //Path module to access server files
const bodyParser = require("body-parser"); //Get post data onto req

const options = {
    key: fs.readFileSync(path.join(__dirname, '../data/config/certs/key.key')),
    cert: fs.readFileSync(path.join(__dirname, '../data/config/certs/cert.crt'))
};

const Logger = require('../App/Logger').Logger; //Logger
const log = new Logger('../data/Logs'); //Create logger object

const port = 443;
const app = express(); //Start app

app.use(session({ //Add session storage later, npm install connect-session-sequelize
    secret: 'keyboard cat', //TODO: Rotate this
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(helmet());

const server = https.createServer(options, app).listen(port, () => {
    console.log(`Example app listening at ${port}`);
});

const io = require('socket.io').listen(server); //For communication

const DataType = require('../App/DataProvider/DataProvider').DataProvider;
var data = new DataType('../../data/TestData/');

io.on('connection', (socket) => {
    console.log(`New user detected: ${socket.client.id}`);
    var address = socket.handshake.address;
    log.connection(toString(address.address) + toString(address.port));
    socket.on('folderreq', (dir) => {
        data.getStructureById(0).then((res, rej) => {
            socket.emit('folderres', res['1']);
        });
    });
});

app.get('/', (req, res) => {
    res.send('Hello World!');
    console.log(req.session);
});

app.get('/user/\\d', (req, res) => {
    res.sendFile(path.join(__dirname, 'Web', 'userview.html'));
});

app.get('/home', (req, res) => {
    //If logged in:
    res.sendFile(path.join(__dirname, 'Web', 'home.html'));
    //If not, redirect to login page
});

app.get('/scripts/reqdata.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'Web', 'js', 'reqdata.js'));
});

app.get('/socket.io.js', (req, res) => {
    res.sendFile(path.join(__dirname, "../node_modules/socket.io-client/dist/socket.io.js"));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'Web', 'login.html'));
});

app.post('/login', (req, res) => {
    //console.log(req.body);
});