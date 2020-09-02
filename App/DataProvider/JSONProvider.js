//Storing data as JSON is purely for testing purpose. Do not use it for production.
const DataProvider = require('./DataProvider.js.js').DataProvider;

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
        this.setFields(require('../data/Test/fields.json'));
        this.setTemplates(require('../data/Test/templates.json'));
        this.setData(require('../data/Test/data.json'));
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