const BehaviourBase = require('./BehaviourBase').BehaviourBase;
const data = require('../../../App/DataProvider/DataProvider').data;

class DefaultBehaviour extends BehaviourBase{
    constructor(){
        super(0);
    }
    display(userid, dataid){
        var currentData = data.getDataById(dataid);
        var currentUser = data.getUserById(userid);
    }
}

module.exports = {
    DefaultBehaviour: DefaultBehaviour
}