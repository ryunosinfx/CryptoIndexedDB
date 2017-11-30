import constant from './constant'
import Authoricator from './auth/authoricator'
import Entity from '../entity/entity'
import DBControlUtil from './dbControlUtil'
const dbSyncronizeQueue = [];

let dbsImpl = null;

///////////////////////////////////////////////////////////////////////////////////////////////
class DBSyncronizerImpl {
  constructor(authoricator, imdbAccessor) {
    this.isIgnited = false;
    this.dbControlUtil = new DBControlUtil(authoricator);
    this.imdbAccessor = imdbAccessor;
    this.isOnTran = false;
    this.onTranTimer = null;
  }
  ignition() {
    if (this.isIgnited) {
      return;
    }
    let self = this;
    this.isIgnited = true;
    while (true) {
      if(this.isOnTran){
        this.onTranTimer = setTimeout(()=>{self.isOnTran = false;},10000);
        continue;
      }
      clearTimout(this.onTranTimer);
      this.shiftQueue();
    }
  }
  shiftQueue() {
    if (dbSyncronizeQueue.length > 0) {
      let targetsWithCommand = dbSyncronizeQueue.shift();
      this.execute(targetsWithCommand);
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
  async doExecuteAsTranzactional(targetsWithCommands){
    dbsImpl.isOnTran = true;
    for(let targetsWithCommand of targetsWithCommands){
      await dbsImpl.execute(targetsWithCommand);
    }
    dbsImpl.isOnTran = false;
  }
}
