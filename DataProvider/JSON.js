//Storing data as JSON is purely for testing purpose. Do not use it for production.


class JSONProvider extends DataProvider{
    setData(self, data){
        self._data = data;
    }

    constructor(){
    }
    
    getDataById(id){
        return this._data[`${id}`];
    }
}