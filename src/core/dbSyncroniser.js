import constant from './constant'
import Authoricator from './auth/authoricator'
import Entity from '../entity/entity'
import Entity from '../entity/entity'
import DBControlUtil from './dbControlUtil'
const dbSyncronizeQueue = [];

const dbsImpl = null;

///////////////////////////////////////////////////////////////////////////////////////////////
class DBSyncronizerImpl {
  constructor(authoricator, imdbAccessor) {
    this.isIgnited = false;
    this.dbControlUtil = new DBControlUtil(authoricator);
    this.imdbAccessor = imdbAccessor;
  }
  ignition() {
    if (this.isIgnited) {
      return;
    }
    this.isIgnited = true;
    while (true) {
      this.shiftQueue();
    }
  }
  shiftQueue() {
    if (dbSyncronizeQueue.length > 0) {
      let targetsWithCommand = dbSyncronizeQueue.shift();
      this.execute(targetsWithCommand)；
    }
    // Call at One thead!
  }
  async execute(targetsWithCommand) {
    let tergets = targetsWithCommand.targets;
    let command = targetsWithCommand.command;
    for (let target of tergets) {
      if (Object.getPrototypeOf(Object.getPrototypeOf(terget)) === Entity) {
        if (command === "delete") {
          await this.dalete(terget);
        } else {
          await this.save(terget);
        }
      }
    }
  }
  async save(entity) {
    let saveDataMap = await this.dbControlUtil.saveAsEncryptedData(entity);
    this.imdbAccessor.loadByMap(saveDataMap);
  }
  async delete(entity) {
    await this.dbControlUtil.delete(entity);
    this.imdbAccessor.delete(entity);
  }
}
//外部インターフェイス
export default class DBSyncronizer {
  constructor(authoricator) {
    // singleton
    if (dbsImpl === null) {
      dbsImpl = new DBSyncronizerImpl(authoricator);
    }
  }

  pushQueue(targetsWithCommand) {
    dbsImpl.ignition();
    if (targetsWithCommand) {
      dbSyncronizeQueue.push(targetsWithCommand);
    }
  }
}
