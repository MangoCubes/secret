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
        // this.loadFields(JSON.parse(fs.readFileSync(`${dir}/data/${arr[i]}/fields.json`)), arr[i]);
        // this.loadTemplates(JSON.parse(fs.readFileSync(`${dir}/data/${arr[i]}/templates.json`)), arr[i]);
        // this.loadData(JSON.parse(fs.readFileSync(`${dir}/data/${arr[i]}/data.json`)), arr[i]);
        // this.loadStructure(JSON.parse(fs.readFileSync(`${dir}/data/${arr[i]}/structure.json`)), arr[i]);
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
        let original = this.getDataById(id);
        original[key] = newData;

    }

    saveTemplate(id, key){
    }

    saveField(id, key){
    }

    saveUser(id){
    }

    saveFolder(id, key){
    }
    
    editData(id, key){
    }

    editTemplate(id, key){
    }

    editField(id, key){
    }

    editUser(id){
    }

    editStructure(id, key){
    }
}

module.exports = {
    JSONProvider: JSONProvider
}
// Writing this down so I can remember how to use async stuff if I ever forget how
// let j = new JSONProvider('../../data/TestData/');
// j.getAllUsers().then((res, rej) => {
//     console.log(res);
// });