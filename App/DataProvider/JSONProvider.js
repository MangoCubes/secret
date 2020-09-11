//Storing data as JSON is purely for testing purpose. Do not use it for production.
const DataProviderBase = require('./DataProviderBase').DataProviderBase;
const fs = require('fs');

class JSONProvider extends DataProviderBase{
    setData(data, key){
        this._data[key] = data;
    }

    setTemplates(templates, key){
        this._templates[key] = templates;
    }

    setFields(fields, key){
        this._fields[key] = fields;
    }

    setUsers(users){
        this._users = users;
    }

    setStructure(structure, key){
        this._structure[key] = structure;
    }

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
        dir = __dirname + '/' + dir;
        this._data = {};
        this._templates = {};
        this._fields = {};
        this._structure = {};
        this.checkMainDir(dir);
        this.setUsers(require(`${dir}/users.json`));
        let arr = Object.keys(this._users);
        for(let i = 0; i < arr.length; i++){
            this.checkFile(dir, arr[i]);
            this.setFields(JSON.parse(fs.readFileSync(`${dir}/data/${arr[i]}/fields.json`)), arr[i]);
            this.setTemplates(JSON.parse(fs.readFileSync(`${dir}/data/${arr[i]}/templates.json`)), arr[i]);
            this.setData(JSON.parse(fs.readFileSync(`${dir}/data/${arr[i]}/data.json`)), arr[i]);
            this.setStructure(JSON.parse(fs.readFileSync(`${dir}/data/${arr[i]}/structure.json`)), arr[i]);
        }
    }
    
    getDataById(id, key){
        return this._data[key][`${id}`];
    }

    getTemplateById(id, key){
        return this._templates[key][`${id}`];
    }

    getFieldById(id, key){
        return this._fields[key][`${id}`];
    }

    getUserById(id){
        return this._users[`${id}`];
    }

    getFolderById(id, key){
        return this._structure[key][`${id}`];
    }
}

module.exports = {
    JSONProvider: JSONProvider
}
