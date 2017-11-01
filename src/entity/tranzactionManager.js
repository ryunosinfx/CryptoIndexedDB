import constant from '../core/constant'
import EntityManager from './entityManager'
import Query from './query/query'
export default class TranzactionManager extends entityManager {
  constructor() {
    this.constant = constant.dbName;
    this.isOnTranzaction = false;
    this.isCommited = false;
    this.tranzactionalQueue = {
      "save": [],
      "delete": []
    };
  }
  begin() {
    if (this.isCommited) {
      throw "do not reuse a tranzaction!";
    }
    this.isOnTranzaction = true;
    this.tranzactionalQueue = {
      "save": [],
      "delete": []
    };
  }
  commit() {
    let self = this;
    let cmd = [
      {command: "delete", targets: this.tranzactionalQueue.delete},
      {command: "save", targets: this.tranzactionalQueue.save}
    ];
    let executePromise = this.dBSyncronizer.doExecuteAsTranzactional(cmd);
    return new Promise((resolve, reject) => {
      executePromise.then((data) => {
        this.isOnTranzaction = false;
        this.tranzactionalQueue = {
          "save": [],
          "delete": []
        };
        this.isCommited = true;
        resolve(data);
      }, (e) => {
        reject(e);
      })
    });
  }
  rollback() {
    this.isOnTranzaction = false;
    this.tranzactionalQueue = {
      "save": [],
      "delete": []
    };
    this.isCommited = true;
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
    await this.addQueue("save", entitys);
  }
  async delete(entitys) {
    await this.addQueue("delete", entitys);
  }
  async addQueue(command, entitys) {
    let targets = entitys;
    if (Array.isArray(entitys) === false) {
      targets = [entitys];
    }
    this.tranzactionalQueue[command] = this.tranzactionalQueue[command].concat(targets);
  }
  async createQuery(isOnTranzaction) {
    if () {
      return await super.createQuery(true);
    }
    return null;
  }
