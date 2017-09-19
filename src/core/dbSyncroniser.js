import constant from './constant'
import Authoricator from './auth/authoricator'
import Entity from '../entity/entity'
const dbSyncronizeQueue = [];

const dbsImpl = null;
const deserializer = (dataBuffer) {}
const serializ = (resultData = {}, entity) {
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
      serializ(resultData,value);
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
    this.authoricator = authoricator;
  }
  ignition() {
    while (true) {
      this.unshiftQueue();
    }
  }
  shiftQueue() {
    if (dbSyncronizeQueue.length > 0) {
      let terget = dbSyncronizeQueue.shift();
      this.execute(terget)；
    }
    // Call at One thead!
  }
  execute(tergets) {
    for (let target of tergets) {

      if (Object.getPrototypeOf(Object.getPrototypeOf(terget)) === Entity) {}

    }
  }
}
export default class DBSyncronizer {
  constructor(authoricator) {
    if (dbsImpl === null) {
      dbsImpl = new DBSyncronizerImpl(authoricator);
    }
    this.authoricator = authoricator;
  }

  pushQueue(targets) {
    if (targets) {
      dbSyncronizeQueue.push(targets);
    }
  }
}
