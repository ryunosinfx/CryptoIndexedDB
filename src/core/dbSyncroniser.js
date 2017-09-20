import constant from './constant'
import Authoricator from './auth/authoricator'
import Entity from '../entity/entity'
const dbSyncronizeQueue = [];

const dbsImpl = null;
const deserializer = (dataBuffer) {}
const serialize = (resultData = {}, entity) {
  let type = entity.constructor.name;
  let serialData = {};
  let serial = {
    pk: entity.pk,
    type: type,
    data: serialData
  };
  for (let key in entity) {
    let value = entity[key];
    if (Object.getPrototypeOf(Object.getPrototypeOf(terget)) === Entity) {
      let ref = {
        type: "ref",
        key: entity.pk
      };
      serialData[key] = ref;
      serialize(resultData,value);
    } else {
      serialData[key] = value;
    }
  }
  if(!!entity.isUpdated === false){
    return resultData;
  }
  resultData[entity.pk] = JSON.sringify(serial);
  return resultData;
}
class DBSyncronizerImpl {
  constructor(authoricator) {
    this.isIgnited = false;
    this.authoricator = authoricator;
  }
  ignition() {
    if(this.isIgnited){
      return ;
    }
    this.isIgnited = true;
    while (true) {
      this.unshiftQueue();
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
        if(command === "delete"){
          await this.dalete(terget);
        }else{
          await this.save(terget);
        }
      }

    }
  }
  async save(){

  }
  async delete(){

  }
}
//外部インターフェイス
export default class DBSyncronizer {
  constructor(authoricator) {
    // singleton
    if (dbsImpl === null) {
      dbsImpl = new DBSyncronizerImpl(authoricator);
    }
    this.authoricator = authoricator;
  }

  pushQueue(targetsWithCommand) {
    dbsImpl.ignition();
    if (targetsWithCommand) {
      dbSyncronizeQueue.push(targetsWithCommand);
    }
  }
}
