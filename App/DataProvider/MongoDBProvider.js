const DataProviderBase = require('./DataProvider.js').DataProviderBase;
const config = require('../data/config/config.js').configData;

const MongoClient = require('mongodb').MongoClient;
const url = config.mongoDB.address;

class MongoDBProvider extends DataProviderBase{
    
}