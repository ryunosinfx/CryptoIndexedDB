import constant from './constant'
import Authoricator from './auth/authoricator'
import idbr from './idb/idbRapper'
export default class DBScanner {
  constructor(authoricator) {
      this.authoricator = authoricator;
      this.idbr = new idbr(constant.sysPrefix);
  }
  async reload(entity){
    var idbr = new idbr(constant.sysPrefix);
  }
  async fullLoad(){

  }
  async singleLoad(key){

  }
  async loadBinaryData(key){

  }
}
