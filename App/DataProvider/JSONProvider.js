//Storing data as JSON is purely for testing purpose. Do not use it for production.
const DataProviderBase = require('./DataProviderBase').DataProviderBase;

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

    setUsers(users, key){
        this._users[key] = users;
    }

    setStructure(structure, key){
        this._structure[key] = structure;
    }

    constructor(){
        super();
        this.setUsers(require(`../../data/Test/users.json`));
        Object.keys(this._users).forEach(function(key) {
            this.setFields(require(`../../data/Test/data/${key}/fields.json`), key);
            this.setTemplates(require(`../../data/Test/data/${key}/templates.json`), key);
            this.setData(require(`../../data/Test/data/${key}/data.json`), key);
            this.setStructure(require(`../../data/Test/data/${key}/structure.json`), key);
        });
        
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

    getUserById(id, key){
        return this._users[key][`${id}`];
    }

    getFolderById(id, key){
        return this._structure[key][`${id}`];
    }

    getAll(){

    }
}

module.exports = {
    JSONProvider: JSONProvider
}