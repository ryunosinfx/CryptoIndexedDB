import constant from '../constant'
import Authoricator from '../auth/authoricator'
import Range from '../../entity/range'
import Entity from '../../entity/entity'
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
  select(entity) {
    if (entity != null && Object.getPrototypeOf(Object.getPrototypeOf(entity)) === Entity) {
      let conditions = entity.getAsContions();
      let entityName = entity.constructor.name;
      let imdbEntities = inMemoryDB[entityName];
      let conditions = entity.getAsContions();
      let resultList = [];
      if (imdbEntities !== undefined) {
        for (let record in imdbEntities) {
          let isMatched = true;
          for (let key in conditions) {
            let value = record[key];
            let condition = conditions[key];
            if (Object.getPrototypeOf(condition) === range) {
              if (
                condition.isGrater(value) === false ||
                condition.isLesser(value) === false ||
                condition.isGgaterEqual(value) === false ||
                condition.isLesserEqual(value) === false
              ) {
                isMatched = false;
                break;
              }
            }else{
              if(value !== condition){
                  isMatched = false;
                  break;
              }
            }
          }
          if(isMatched){
            resultList.push(record);
          }
        }
      }
    } else {
      console.log("entity is unsetted!!!");
    }
  }
  selectList(entityName, ...pks) {
    if (Arrays.isArray(pks) === false) {
      return this.selectSingle(entityName, pks);
    }
    let imdbEntities = inMemoryDB[entityName];
    if (imdbEntities !== undefined) {
      let retList = [];
      for (let record in imdbEntities) {
        for (let pk of pks) {
          if (record.pk === pk) {
            retList.push(this.getAsFullRelated(record));
          }
        }
      }
      return retList;
    }
    return [];
  }
  selectSingle(entityName, pk) {
    let imdbEntities = inMemoryDB[entityName];
    if (imdbEntities !== undefined) {
      for (let record in imdbEntities) {
        if (record.pk === pk) {
          return this.getAsFullRelated(record);
        }
      }
    }
    return null;
  }
  getAsFullRelated(entity) {
    let data = entity.origin;
    for (let key in data) { //refで入っているので
      let value = data[key];
      if (typeof value === "object" && value.tyep === "ref") {
        data[key] = this.selectList(value.keys);
      }
    }
    return entity;
  }
}
