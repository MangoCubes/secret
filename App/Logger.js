const fs = require('fs');

class Logger{
    constructor(dir) { //dir is location of the log folder in relation to this file
        this.dir = dir;
        if(!fs.existsSync(this.dir)) fs.mkdirSync(this.dir, { recursive: true }); //If log directory does not exist, create one
        this.globallog = fs.createWriteStream(__dirname + '/' + this.dir + '/logs.log', {flags : 'a+'}); //Create file write stream for global(and anonymous) log
        this.userlog = __dirname + '/' + this.dir + '/Users/';
        if(!fs.existsSync(this.userlog)) fs.mkdirSync(this.userlog, { recursive: true }); //If the directory to user specific log does not exist, create one
    }

    connection(ip){
        let now = new Date();
        this.globallog.write(`${now}: [INFO] New connection from ${ip}.`);
    }

    loginfailed(userid, attempts, ip){
        if(!fs.existsSync(this.userlog + userid)) fs.mkdirSync(this.userlog + userid, { recursive: true });
        let file = this.userlog + userid + '/login.log';
        let now = new Date();
        let str = fs.createWriteStream(file, {flags : 'a+'});
        str.write(`${now}: [WARNING] Someone from ${ip} tried to log in and failed ${attempts} times in total.`);
    }

    loginsuccessful(userid, ip){
        if(!fs.existsSync(this.userlog + userid)) fs.mkdirSync(this.userlog + userid, { recursive: true });
        let file = this.userlog + userid + '/login.log';
        let now = new Date();
        let str = fs.createWriteStream(file, {flags : 'a+'});
        str.write(`${now}: [INFO] User logged in from ${ip}.`);
    }

    access(userid, dataid, fieldidarr){
        if(!fs.existsSync(this.userlog + userid)) fs.mkdirSync(this.userlog + userid, { recursive: true });
        let file = this.userlog + userid + '/login.log';
        let now = new Date();
        let str = fs.createWriteStream(file, {flags : 'a+'});
        str.write(`${now}: [INFO] User accessed data with an ID ${data}. Fields with ID ${fieldidarr.join(', ')} were visible.`);
    }

    modification(userid, dataid, before, after){
        
    }

    revelation(userid, dataid, fieldid){
        if(!fs.existsSync(this.userlog + userid)) fs.mkdirSync(this.userlog + userid, { recursive: true });
        let file = this.userlog + userid + '/login.log';
        let now = new Date();
        let str = fs.createWriteStream(file, {flags : 'a+'});
        str.write(`${now}: [INFO] User revealed hidden field with ID ${fieldid} from data ${dataid}.`);
    }
}

module.exports = {
    Logger: Logger
}