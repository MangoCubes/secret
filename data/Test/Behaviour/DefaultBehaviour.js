const BehaviourBase = require('./BehaviourBase').BehaviourBase;

class DefaultBehaviour extends BehaviourBase{
    display(user, data, rule){
        if(rule == 0){

        }
    }
}

module.exports = {
    DefaultBehaviour: DefaultBehaviour
}