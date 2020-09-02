const DataProvider = require('./DataProvider.js').DataProvider;
const config = require('../data/config/config.js').configData;

const MongoClient = require('mongodb').MongoClient;
const url = config.mongoDB.address;

class MongoDBProvider extends DataProvider{
    
}