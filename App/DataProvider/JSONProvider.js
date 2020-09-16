//Storing data as JSON is purely for testing purpose. Do not use it for production.
const DataProviderBase = require('./DataProviderBase').DataProviderBase;
const fs = require('fs');

class JSONProvider extends DataProviderBase{
    checkMainDir(dir){
        if(!fs.existsSync(`${dir}`)) fs.mkdirSync(`${dir}`, { recursive: true });
        if(!fs.existsSync(`${dir}/users.json`)) fs.writeFileSync(`${dir}/users.json`, '{}', {flag: 'wx'});
        if(!fs.existsSync(`${dir}/data/`)) fs.mkdirSync(`${dir}/data/`, { recursive: true });
    }

    checkFile(dir, key){
        if(!fs.existsSync(`${dir}/data/${key}`)) fs.mkdirSync(`${dir}/data/${key}`, { recursive: true });
        if(!fs.existsSync(`${dir}/data/${key}/fields.json`)) fs.writeFileSync(`${dir}/data/${key}/fields.json`, '{}', {flag: 'wx'});
        if(!fs.existsSync(`${dir}/data/${key}/templates.json`)) fs.writeFileSync(`${dir}/data/${key}/templates.json`, '{}', {flag: 'wx'});
        if(!fs.existsSync(`${dir}/data/${key}/data.json`)) fs.writeFileSync(`${dir}/data/${key}/data.json`, '{}', {flag: 'wx'});
        if(!fs.existsSync(`${dir}/data/${key}/structure.json`)) fs.writeFileSync(`${dir}/data/${key}/structure.json`, '{}', {flag: 'wx'});
    }

    constructor(dir){
        super();
        this.dir = __dirname + '/' + dir;
        this.checkMainDir(this.dir);
        this.getAllUsers().then((res, rej) => {
            if(rej) throw rej;
            Object.keys(res).forEach(k => { //Repeat for all user IDs
                this.checkFile(this.dir, k); //Check integrity of each user's data
            });
        });
    }

    getAllUsers(){
        return new Promise((res, rej) => {
            fs.readFile(`${this.dir}/users.json`, (err, data) => {
                if (err) rej(err);
                else res(JSON.parse(data));
            });
        });
    }

    getUserById(id){
        return new Promise((res, rej) => {
            fs.readFile(`${this.dir}/users.json`, (err, data) => {
                if (err) rej(err);
                else res(JSON.parse(data));
            });
        });
    }

    getDataById(id){
        return new Promise((res, rej) => {
            fs.readFile(`${this.dir}/data/${id}/data.json`, (err, data) => {
                if (err) rej(err);
                else res(JSON.parse(data));
            });
        });
    }

    getTemplateById(id){
        return new Promise((res, rej) => {
            fs.readFile(`${this.dir}/data/${id}/templates.json`, (err, data) => {
                if (err) rej(err);
                else res(JSON.parse(data));
            });
        });
    }

    getFieldById(id){
        return new Promise((res, rej) => {
            fs.readFile(`${this.dir}/data/${id}/fields.json`, (err, data) => {
                if (err) rej(err);
                else res(JSON.parse(data));
            });
        });
    }

    getStructureById(id){
        return new Promise((res, rej) => {
            fs.readFile(`${this.dir}/data/${id}/structure.json`, (err, data) => {
                if (err) rej(err);
                else res(JSON.parse(data));
            });
        });
    }

    saveData(id, key, newData){
        this.getDataById(id).then((res, rej) => {
            if(rej) throw rej;
            res[key] = newData;
            fs.writeFile(`${this.dir}/data/${id}/data.json`, res, err => {
                if (err) throw err;
                else return 0;
            });
        });
    }

    saveTemplate(id, key, newData){
        this.getTemplateById(id).then((res, rej) => {
            if(rej) throw rej;
            res[key] = newData;
            fs.writeFile(`${this.dir}/data/${id}/templates.json`, res, err => {
                if (err) throw err;
                else return 0;
            });
        });
    }

    saveField(id, key, newData){
        this.getFieldById(id).then((res, rej) => {
            if(rej) throw rej;
            res[key] = newData;
            fs.writeFile(`${this.dir}/data/${id}/fields.json`, res, err => {
                if (err) throw err;
                else return 0;
            });
        });
    }

    saveUser(id, newData){
        this.getUserById(id).then((res, rej) => {
            if(rej) throw rej;
            res[key] = newData;
            fs.writeFile(`${this.dir}/users.json`, res, err => {
                if (err) throw err;
                else return 0;
            });
        });
    }

    saveStructure(id, key, newData){
        this.getStructureById(id).then((res, rej) => {
            if(rej) throw rej;
            res[key] = newData;
            fs.writeFile(`${this.dir}/data/${id}/structure.json`, res, err => {
                if (err) throw err;
                else return 0;
            });
        });
    }
    getStructureByName(id, name, strid){ //Find a folder by name in a folder, which is supplied by id
        this.getStructureById(id).then((res, rej) => {
            if(rej) throw rej;
            if(!strid) {
                Object.keys(res).forEach(k => {
                    if(res[k].isroot) strid = k;
                });
            }
            res[strid].subfolder.forEach(k => {
                if(res[k].name === name) return res[k];
            });
        });
    }
}

module.exports = {
    JSONProvider: JSONProvider
}