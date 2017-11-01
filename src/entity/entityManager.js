import constant from '../core/constant'
import DBSyncronizer from '../core/dbSyncroniser'
import DBScanner from '../core/dbScanner'
export default class EntityManager {
  constructor(userId, passwd) {
    this.constant = constant.dbName;
    this.dbScanner = new DBScanner();
    this.dBSyncronizer = this.dbScanner.dBSyncronizer;
  }
  async login(userId, password) {
    await this.authoricator.signin(userId, password);
    //fullLoad
    await this.dbScanner.fullLoad();
  }
  async logout() {
    await this.authoricator.signout(userId, password);
    this.dbScanner.deleteAllDataAtLogout();
  }
  load(entity) {
    return this.dbScanner.select(entity);
  }
  async save(entitys) {
    await this.pushQueue("save", entitys);
  }
  async delete(entitys) {
    await this.pushQueue("delete", entitys);
  }
  async pushQueue(command, entitys) {
    let targets = entitys;
    if (Array.isArray(entitys) === false) {
      targets = [entitys];
    }
    await this.dBSyncronizer.pushQueue({command: command, targets: targets});
  }
  async createQuery(isOnTranzaction) {
    if (await this.isLogiedIn()) {
      return new Query(isOnTranzaction, this.dbScanner);
    }
    return null;
  }
}
