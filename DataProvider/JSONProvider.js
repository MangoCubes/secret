//Storing data as JSON is purely for testing purpose. Do not use it for production.
const DataProvider = require('./DataProvider.js').DataProvider;

class JSONProvider extends DataProvider{
    setData(data){
        this._data = data;
    }

    setTemplates(templates){
        this._templates = templates;
    }

    setFields(fields){
        this._fields = fields
    }

    constructor(){
        super();
        this._rawData = require('../data/Test/data.json');
        this.setFields(this._rawData['fields']);
        this.setTemplates(this._rawData['templates']);
        this.setData(this._rawData['data']);
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
}

module.exports = {
    JSONProvider: JSONProvider
}