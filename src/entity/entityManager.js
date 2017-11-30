import constant from '../core/constant'
import DBScanner from '../core/dbScanner'
export default class EntityManager {
  constructor(dbScanner) {
    this.dbScanner = dbScanner;
    this.dBSyncronizer = this.dbScanner.dBSyncronizer;
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
}
