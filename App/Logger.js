const fs = require('fs');

class Logger{
    constructor(dir) { //dir is relative location of the log folder location
        this.dir = dir;
        this.globallog = fs.createWriteStream(__dirname + '/' + this.dir + '/logs.log', {flags : 'a+'});
        this.userlog = __dirname + '/' + this.dir + 'Users';
        if(!fs.existsSync(this.userlog)) fs.mkdirSync(this.userlog, { recursive: true });
    }

    connection(ip){
        let now = new Date();
        this.globallog.write(`${now}: [INFO] New connection from ${ip}.`);
    }

    loginfailed(username, attempts, ip){
        let file = __dirname + '/' + this.dir + '/Users/' + username + 'login.log';
        let now = new Date();
        let str = fs.createWriteStream(file, {flags : 'a+'});
        this.str.write(`${now}: [WARNING] Someone from ${ip} tried to log in and failed ${attempts} times in total.`);
    }

    loginsuccessful(username, ip){
        let file = __dirname + '/' + this.dir + '/Users/' + username + 'login.log';
        let now = new Date();
        let str = fs.createWriteStream(file, {flags : 'a+'});
        this.str.write(`${now}: [INFO] User logged in from ${ip}.`);
    }

    access(username, dataid, fieldidarr){
        let file = __dirname + '/' + this.dir + '/Users/' + username + 'login.log';
        let now = new Date();
        let str = fs.createWriteStream(file, {flags : 'a+'});
        this.str.write(`${now}: [INFO] User accessed data with an ID ${data}. Fields with ID ${fieldidarr.join(', ')} were not hidden.`);
    }

    modification(username, dataid, before, after){

    }

    revelation(username, dataid, fieldid){
        let now = new Date();
        this.logfile.write(`${now}: [INFO] ${username} logged in from ${ip}.`);
    }
}

module.exports = {
    Logger: Logger
}