class BehaviourBase{
    constructor(id){
        this.id = id;
        if (this.constructor === BehaviourBase) {
            throw new Error("Abstract class BehaviourBase initiated. Please create a derived class of this to create new behaviours instead.");
        }
    }
}

module.exports = {
    BehaviourBase: BehaviourBase
}