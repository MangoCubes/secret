const fs = require('fs');

class Logger{
    constructor(dir) { //dir is relative location of the log file
        this.dir = dir;
        this.logfile = fs.createWriteStream(__dirname + '/' + this.dir + '/logs.log', {flags : 'a+'});
        console.log(this.logfile);
    }

    connection(ip){
        this.logfile.write(`INFO: New connection from ${ip}`);
    }
}

module.exports = {
    Logger: Logger
}