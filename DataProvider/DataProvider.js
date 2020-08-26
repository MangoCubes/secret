class DataProvider{
    constructor() {
        if (this.constructor == DataProvider) {
            throw new Error("Error: Abstract class initiated.");
        }
    }
}

module.exports = {
    DataProvider: DataProvider
}