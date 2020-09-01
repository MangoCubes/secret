var config = {
    //Decides how data should be stored
    //Options: MySQL, SQLite, MongoDB, JSON
    "storageType": "JSON",
    //Disable access without HTTPS
    "enforceHTTPS": "false",
    //Sets how long one can stay logged in without performing any actions
    "sessionTimeout": "600",
    //Allow signups
    "allowSignup": "false",
    //MongoDB configuration
    "mongoDB": {
        "address": "localhost",

    },
    "ioport": 8088
}

module.exports = {
    configData: config
}