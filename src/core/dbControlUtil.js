import constant from './constant'
import idbr from './idb/idbRapper'
const impl = null;
class DBControlUtilImpl {
  constructor(authoricator) {
      this.authoricator = authoricator;
  }
  async reload(entity){
    var idbr = new idbr(constant.sysPrefix);
  }
  async getIDBWrapper(entity){
    let pk = entity.pk;
    let idbr = new idbr(constant.sysPrefix);
  }
  async getAllIDBWrappers(){

  }
}
export default class DBControlUtil {
  constructor(authoricator) {
      if(impl === null){
        impl = new DBControlUtilImpl();
      }
  }
  async getIDBWrapper(entity){
    let pk = entity.pk;
    let idbr = new idbr(constant.sysPrefix);
  }
  async getAllIDBWrappers(){

  }
  async singleLoad(key){

  }
  async loadBinaryData(key){

  }
}
