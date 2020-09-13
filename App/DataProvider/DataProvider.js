const path = require('path');
const config = require('../../data/config/config').configData;
var DataProvider;

if (config.storageType === 'JSON') DataProvider = require(path.join(__dirname, './JSONProvider')).JSONProvider;
else if (config.storageType === 'mongodb') DataProvider = require(path.join(__dirname, './MongoDBProvider')).MongoDBProvider;

module.exports = {
    DataProvider: DataProvider
}