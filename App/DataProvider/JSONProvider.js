//Storing data as JSON is purely for testing purpose. Do not use it for production.
const DataProviderBase = require('./DataProviderBase').DataProviderBase;

class JSONProvider extends DataProviderBase{
    setData(data){
        this._data = data;
    }

    setTemplates(templates){
        this._templates = templates;
    }

    setFields(fields){
        this._fields = fields;
    }

    setUsers(users){
        this._users = users;
    }

    constructor(){
        super();
        this.setFields(require('../../data/Test/fields.json'));
        this.setTemplates(require('../../data/Test/templates.json'));
        this.setData(require('../../data/Test/data.json'));
        this.setUsers(require('../../data/Test/users.json'));
    }
    
    getDataById(id){
        return this._data[`${id}`];
    }

    getTemplateById(id){
        return this._templates[`${id}`];
    }

    getFieldById(id){
        return this._fields[`${id}`];
    }

    getUserById(id){
        return this._users[`${id}`];
    }
}

module.exports = {
    JSONProvider: JSONProvider
}