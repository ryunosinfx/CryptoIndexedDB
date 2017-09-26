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
        imdbEntitiesMap = {};
      }
      for (let imdbEntity of imdbEntities) {
        imdbEntitiesMap[imdbEntity.pk] = imdbEntity;
      }
    }
  }
  delete(entity) {
    // inmemoryOnly
    let entityName = entity.constructor.name;
    let imdbEntities = inMemoryDB[entityName];
    if (imdbEntities !== undefined) {
      delete imdbEntitiesMap[entity.pk];
    }
  }
  select(){

  }
}
