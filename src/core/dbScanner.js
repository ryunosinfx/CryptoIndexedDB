import constant from './constant'
import Authoricator from './auth/authoricator'
import idbr from './idb/idbRapper'
import ImdbAccessor from './omdb/imdbAccessor'
import DBControlUtil from './dbControlUtil'
import DBSyncronizer from './dbSyncroniser'
const imdbAccessor = new ImdbAccessor();
const authoricator = new Authoricator();
const dbControlUtil = new DBControlUtil(authoricator);
const dBSyncronizer = new DBSyncronizer(authoricator, imdbAccessor)
export default class DBScanner {
  constructor() {
    this.dbControlUtil = dbControlUtil;
    this.dBSyncronizer = dBSyncronizer;
    this.idbr = new idbr(constant.sysPrefix);
  }

  async signup(userId, passwd) {
    return await authoricator.signup(userId, passwd);
  }
  async signin(userId, passwd) {
    await authoricator.signin(userId, passwd);
    let isLogedIn = await this.isLogedIn();
    let isActivate = await this.isActivate(userId, passwd);
    if (isLogedIn && isActivate) {
      await this.fullLoad();
      return true;
    }
    this.deleteAllDataAtLogout();
    return false;
  }
  async isLogedIn() {
    return await authoricator.isLogedIn();
  }
  async signout() {
    this.deleteAllDataAtLogout();
    return await authoricator.signout();
  }
  async isActivate(userId, passwd) {
    return await authoricator.isActivate(userId, passwd);
  }
  async activate(userId, passwd) {
    return await authoricator.activate(userId, passwd);
  }
  async reload(entity) {
    if (!!entity) {
      await this.singleLoad(entity);
    } else {
      await this.fullLoad();
    }
  }
  async fullLoad() {
    let idbrs = await this.dbControlUtil.getAllIDBWrappers();
    for (let idbr of idbrs) {
      let dataList = await idbr.loadAllData();
      let dataMap = await this.dbControlUtil.decrypDataList(dataList);
      imdbAccessor.loadByMap(dataMap);
    }
  }
  async singleLoad(entity) {
    let idbr = await this.dbControlUtil.setPkHash(entity);
    let encryptedData = await idbr.loadData(entity.pkHash);
    let loadedEntity = await this.dbControlUtil.decryptEntity(encryptedData);
    if (loadedEntity !== null) {
      imdbAccessor.loadSingle(loadedEntity);
    }
  }
  async loadBinaryData(key) {}
  selectByName(entityName) {
    let entity = this.dbControlUtil.createEntity(entityName);
    return imdbAccessor.select(entity);
  }
  select(entity) {
    return imdbAccessor.select(entity);
  }
  deleteAllDataAtLogout() {
    imdbAccessor.init();
  }
}
