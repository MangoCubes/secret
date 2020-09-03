const path = require('path');
const config = require('../../data/config/config').configData;
var dataProvider;

if (config.storageType === 'JSON') dataProvider = require(path.join(__dirname, './JSONProvider')).JSONProvider;
else if (config.storageType === 'mongodb') dataProvider = require(path.join(__dirname, './MongoDBProvider')).MongoDBProvider;

var data = new dataProvider;


module.exports = {
    data: data
}