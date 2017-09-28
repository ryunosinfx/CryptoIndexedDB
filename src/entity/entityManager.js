import constant from '../core/constant'
import Authoricator from '../core/auth/authoricator'
import DBSyncronizer from '../core/dbSyncroniser'
import DBScanner from '../core/dbScanner'
export default class EntityManager {
  constructor(userId, passwd) {
    this.constant = constant.dbName;
    this.authoricator = new Authoricator();
    this.dbScanner = new DBScanner(this.authoricator);
    this.dBSyncronizer = this.dbScanner.dBSyncronizer;
  }
  async login(userId, password) {
    await this.authoricator.signin(userId, password);
    //fullLoad

  }
  async logout() {}
  async load(entity) {


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
}
