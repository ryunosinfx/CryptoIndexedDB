import constant from '../core/constant'
import EntityManager from './entityManager'
import Query from './query/query'
export default class TranzactionManager extends entityManager {
  constructor() {
    this.constant = constant.dbName;
    this.isOnTranzaction = false;
    this.uncommited =[];
  }
  begin() {
    this.isOnTranzaction = true;
  }
  commit() {
    this.isOnTranzaction = false;
  }
  rollback() {
    this.isOnTranzaction = false;
  }
  getQuery() {
    return new Query(this.isOnTranzaction);
  }
  load(entity) {
    let selectData = this.dbScanner.select(entity);
    for (let record of selectData) {
      record.isInTranzaction = this.isOnTranzactio;
    }
    return selectData;
  }
  async save(entitys) {
    this.uncommited.push();
    await this.pushQueue("save", entitys);
  }
  async delete(entitys) {
    await this.pushQueue("delete", entitys);
  }
}
