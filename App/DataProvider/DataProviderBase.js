class DataProviderBase{
    constructor() {
        if (this.constructor == DataProviderBase) {
            throw new Error('Error: Abstract class initiated.');
        }
    }
}

module.exports = {
    DataProviderBase: DataProviderBase
}