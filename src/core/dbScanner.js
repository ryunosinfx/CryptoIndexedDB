import constant from './constant'
import Authoricator from './auth/authoricator'
import idbr from './idb/idbRapper'
import ImdbAccessor from './omdb/imdbAccessor'
const imdbAccessor = new ImdbAccessor();
export default class DBScanner {
  constructor(authoricator) {
      this.authoricator = authoricator;
      this.dbControlUtil = new DBControlUtil(authoricator);
      this.idbr = new idbr(constant.sysPrefix);
  }
  async reload(entity){
    var idbr = new idbr(constant.sysPrefix);
  }
  async fullLoad(){
    let idbrs = await this.dbControlUtil.getAllIDBWrappers();
    for(let idbr of idbrs){
      let dataList = await idbr.loadAllData();
      let dataMap = await this.decrypEntityMap.decrypDataList(dataList);
      for(let entityName in dataMap){
        let entityList = dataMap[entityName];

      }
    }
  }
  async singleLoad(key){

  }
  async loadBinaryData(key){

  }
}
