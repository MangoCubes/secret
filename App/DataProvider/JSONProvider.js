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
        Object.keys(this.getAllUsers()).forEach(k => { //Repeat for all user IDs
            this.checkFile(this.dir, k); //Check integrity of each user's data
        });
        // this.loadFields(JSON.parse(fs.readFileSync(`${dir}/data/${arr[i]}/fields.json`)), arr[i]);
        // this.loadTemplates(JSON.parse(fs.readFileSync(`${dir}/data/${arr[i]}/templates.json`)), arr[i]);
        // this.loadData(JSON.parse(fs.readFileSync(`${dir}/data/${arr[i]}/data.json`)), arr[i]);
        // this.loadStructure(JSON.parse(fs.readFileSync(`${dir}/data/${arr[i]}/structure.json`)), arr[i]);
    }

    getAllUsers(){
        return JSON.parse(fs.readFileSync(`${this.dir}/users.json`));
    }

    getDataById(id){
        return JSON.parse(fs.readFileSync(`${this.dir}/data/${id}/data.json`));
    }

    getTemplateById(id){
        return JSON.parse(fs.readFileSync(`${this.dir}/data/${id}/templates.json`));
    }

    getFieldById(id){
        return JSON.parse(fs.readFileSync(`${this.dir}/data/${id}/fields.json`));
    }

    getUserById(id){
        return this.getAllUsers()[id];
    }

    getStructureById(id){
        return JSON.parse(fs.readFileSync(`${this.dir}/data/${id}/structure.json`));
    }

    saveData(id, key){
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
