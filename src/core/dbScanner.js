import constant from './constant'
import Authoricator from './auth/authoricator'
import idbr from './idb/idbRapper'
import ImdbAccessor from './omdb/imdbAccessor'
const imdbAccessor = new ImdbAccessor();
export default class DBScanner {
  constructor(authoricator) {
      this.authoricator = authoricator;
      this.dbControlUtil = new DBControlUtil(authoricator);
      this.dBSyncronizer = new DBSyncronizer(authoricator,imdbAccessor);
      this.idbr = new idbr(constant.sysPrefix);
  }
  async reload(entity){
    if(!!entity){
      await this.singleLoad(entity);
    }else{
      await this.fullLoad();
    }
  }
  async fullLoad(){
    let idbrs = await this.dbControlUtil.getAllIDBWrappers();
    for(let idbr of idbrs){
      let dataList = await idbr.loadAllData();
      let dataMap = await this.dbControlUtil.decrypDataList(dataList);
      imdbAccessor.loadByMap(dataMap);
    }
  }
  async singleLoad(entity){
    let idbr = await this.dbControlUtil.setPkHash(entity);
    let encryptedData = await idbr.loadData(entity.pkHash);
    let loadedEntity = await this.dbControlUtil.decryptEntity(encryptedData);
    if(loadedEntity !== null){
      imdbAccessor.loadSingle(loadedEntity);
    }
  }
  async loadBinaryData(key){

  }
}
