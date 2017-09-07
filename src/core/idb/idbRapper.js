import constant from '../constant'
import idbh from '../IndexeddbHelper'
export default class IdbRapper {

  constructor(objectStoreName, keypathName = "pk") {
    if (constant.idbh === undefined) {
      constant.idbh = new idbh(constant.dbName);
    }
    this.idbh = constant.idbh;
    this.keyPathName = keypathName;
    this.objectStoreName = objectStoreName;
    //tableName, keyPathName
    this.firstPromise = this.idbh._createStore(objectStoreName, keypathName);
  }
  async isFished() {
    return new Promise((reslve, reject) => {
      this.firstPromise.then(() => {
        reslve(true);
      }),
      (e) => {
        throw e;
      })});
  }
  async saveDataDefault(key,data) {
    var record = {
      pk: key,
      data: data
    };
    await this.saveData(record);
  }
  async saveData(dataObj, key) {
    let storeData = dataObj;
    if (dataObj[this.keyPathName] === undefined) {
      storeData = {
        data: dataObj
      };
      storeData[this.keyPathName] = key;
    } else if (key !== undefined) {}
    await this.idbh._insertUpdate(this.objectStoreName, this.keyPathName, storeData);
  }
  async loadData(key) {
    if (key !== undefined) {
      return await this.idbh._selectByKey(this.objectStoreName, key);
    }
    return null;
  }
  async loadDataDefault(key) {
      await this.init();
      var record = await this.loadData(key);
      return record === undefined || record === null
        ? null
        : record.data;
  }
  async loadAllData() {
    return await this.idbh._selectAll(this.objectStoreName);
  }
  async deleteData(key) {
    if (key !== undefined) {
      return await this.idbh._delete(this.objectStoreName, key);
    }
    return null;
  }

}
