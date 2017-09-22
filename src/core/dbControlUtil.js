import constant from './constant'
import idbr from './idb/idbRapper'
import Entity from '../entity/entity'
const impl = null;
const idbWrppers = {};
class DBControlUtilImpl {
  constructor(authoricator) {
      this.authoricator = authoricator;
      this.idbr = new idbr(constant.sysPrefix);
      this.isLoaded = false;
  }
  async reload(entity){
    var idbr = new idbr(constant.sysPrefix);
  }
  async loadIDBWrappers(){
    let osNames = await this.idbr.getOsNames();
    let encPrefix = constant.encPrefix;
    let encPrefixLength = encPrefix.length;
    let variantLength = 3 ;
    let osNameLength = variantLength + encPrefixLength;
    for(let osName of osNames){
      if(osName.indexOf(encPrefix) === 0 && osName.length === osNameLength){
        let key = osName.substring(encPrefixLength, osNameLength);
        idbWrppers[key] = new idbr(key);
      }
    }
    this.isLoaded = true;
  }
  async addIDBWrapper(entity){

  }
  async getAllIDBWrappers(){
    return this.isLoaded? idbWrppers : awate this.loadIDBWrappers();
  }
}
///////////////////////////////////////////////////////////
export default class DBControlUtil {
  constructor(authoricator) {
      if(impl === null){
        impl = new DBControlUtilImpl();
      }
  }
  async getIDBWrapper(entity){
    let pk = entity.pk;
    // key
    let idbr = new idbr(constant.sysPrefix);
  }
  async getAllIDBWrappers(){
    for(){

    }
  }
  async singleLoad(key){

  }
  async loadBinaryData(key){

  }
}
