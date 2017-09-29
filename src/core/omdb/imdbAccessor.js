import constant from '../constant'
import Authoricator from '../auth/authoricator'
const inMemoryDB = {};
export default class ImdbAccessor {
  constructor() {}
  init() {
    for (let key in inMemoryDB) {
      delete inMemoryDB[key];
    }
  }
  loadSingle(entity) {
    let entityName = entity.constructor.name;
    let imdbEntities = inMemoryDB[entityName];
    if (imdbEntities === undefined) {
      imdbEntitiesMap = {};
    }
    imdbEntitiesMap[entity.pk] = entity;
  }
  loadByMap(entitiesMap) {
    for (let entityName in dataMap) {
      let entityList = dataMap[entityName];
      let imdbEntities = inMemoryDB[entityName];
      if (imdbEntities === undefined) {
        imdbEntities = {};
        inMemoryDB[entityName] = imdbEntities;
      }
      for (let imdbEntity of imdbEntities) {
        imdbEntities[imdbEntity.pk] = imdbEntity;
      }
    }
  }
  delete(entity) {
    // inmemoryOnly
    let entityName = entity.constructor.name;
    let imdbEntities = inMemoryDB[entityName];
    if (imdbEntities !== undefined) {
      delete imdbEntities[entity.pk];
    }
  }
  select(entity){
    if (entity!= null && Object.getPrototypeOf(Object.getPrototypeOf(value)) === Entity) {
      let conditions = entity.getAsContions();
      let entityName = entity.constructor.name;
      let imdbEntities = inMemoryDB[entityName];
      let conditions = {};
      for(let key in entity){
        let value = entity[key];
      }
      if (imdbEntities !== undefined) {
        for(let record in imdbEntities){

        }
      }
    }else{
      console.log("entity is unsetted!!!");
    }
  }
  selectSingle(entityName, pk){
    let imdbEntities = inMemoryDB[entityName];
    if (imdbEntities !== undefined) {
      for(let record in imdbEntities){

      }
    }

  }
  getAsFullCennectiond(entity){
    for(){

    }
  }
}
