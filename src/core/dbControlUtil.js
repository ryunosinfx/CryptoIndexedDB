import constant from './constant'
import idbr from './idb/idbRapper'
import Entity from '../entity/entity'
const impl = null;
const idbWrppers = {};
const entityClasses = {};
class DBControlUtilImpl {
  constructor(authoricator) {
    this.authoricator = authoricator;
    this.idbr = new idbr(constant.sysPrefix);
    this.isLoaded = false;
  }
  async reload(entity) {
    var idbr = new idbr(constant.sysPrefix);
  }
  async loadIDBWrappers() {
    let osNames = await this.idbr.getOsNames();
    let encPrefix = constant.encPrefix;
    let encPrefixLength = encPrefix.length;
    let variantLength = 3;
    let osNameLength = variantLength + encPrefixLength;
    for (let osName of osNames) {
      if (osName.indexOf(encPrefix) === 0 && osName.length === osNameLength) {
        let key = osName.substring(encPrefixLength, osNameLength);
        idbWrppers[key] = new idbr(osName);
      }
    }
    this.isLoaded = true;
  }
  async setPkHash(entity) {
    let pk = entity.pk;
    let entityName = entity.constructor.name;
    let pkHash = await this.authoricator.crateOSName(entityName, pk);
    let key = pkHash.substring(0, 2);
    let osName = constant.encPrefix + key;
    entity.pkHash = pkHash;
    if (idbWrppers[key] === undefined) {
      idbWrppers[key] = new idbr(osName);
    }
    return idbWrppers[key];
  }
  async getAllIDBWrappers() {
    return this.isLoaded
      ? idbWrppers
      : await this.loadIDBWrappers();
  }
  async decrypData(encryptedData) {
    try {
      return await this.authoricator.decrypt(encryptedData);
    } catch (e) {
      return null;
    }
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////
  deserialize(jsonString) {
    let dataObj = JSON.parse(jsonString);
    let {pk, originPk, type, data} = dataObj;
    let entityClass = entityClasses[type];
    if (entityClass) {
      let entityInstance = new entityClass(originPk, data, pk);
      return entityInstance;
    } else {}
    return null;
  }
  createEntity(entityName) {
    let entityClass = entityClasses[entityName];
    if (entityClass) {
      let entityInstance = new entityClass(null, {}, null);
      return entityInstance;
    } else {}
    return null;
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////
  async serialize(entity, resultData = {}, pkHashCalced) {
    let pk = entity.pk;
    let entityName = entity.constructor.name;
    let pkHash = pkHashCalced !== undefined
      ? pkHashCalced
      : await this.authoricator.crateOSName(entityName, pk);
    let serialData = {};
    let serial = {
      pk: pkHash,
      originPk: pk,
      type: entityName,
      data: serialData
    };
    //中間にObjectを絶対挟まないこと
    for (let key in entity) {
      let value = entity[key];
      if (Array.isArray(value)) {
        let tempArray = [];
        for (let index in value) {
          let recode = value[index];
          if (Object.getPrototypeOf(Object.getPrototypeOf(recode)) === Entity) {
            let pkChild = recode.pk;
            let entityNameChild = recode.constructor.name;
            let pkHashChiled = await this.authoricator.crateOSName(entityNameChild, pkChild, pkHashChiled);
            let ref = {
              type: "ref",
              key: pkHashChiled
            };
            tempArray.push(ref);
            serialData[key] = ref;
            serialize(recode, resultData);
          } else {
            tempArray.push(recode);
          }
        }
        serialData[key] = tempArray;
      } else {
        if (Object.getPrototypeOf(Object.getPrototypeOf(value)) === Entity) {
          let pkChild = value.pk;
          let entityNameChild = value.constructor.name;
          let pkHashChiled = await this.authoricator.crateOSName(entityNameChild, pkChild, pkHashChiled);
          let ref = {
            type: "ref",
            key: pkHashChiled
          };
          serialData[key] = ref;
          serialize(value, resultData);
        } else {
          serialData[key] = value;
        }

      }
    }
    if (!!entity.isUpdated === false) {
      return resultData;
    }
    resultData[pkHash] = serial;
    return
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////
  registerEntity(entity) {
    let entityName = entity.constructor.name;
    entityClasses[entityName] = entity.prototype;
  }
  getIdbWrpper(pkHash) {
    let key = pkHash.substring(0, 2);
    return idbWrppers[key];
  }
  async saveAsEncryptedData(entity) {
    await this.setPkHash(entity);
    let serializedMap = await this.serialize(entity);
    let savedDataMap = {};
    for (let pkHash in serializedMap) {
      let serialObject = serializedMap[pkHash];
      let jsonData = JSON.stringify(serialObject);
      let encryptedData = await this.authoricator.encrypt(jsonData);
      let idbr = this.getIdbWrpper(pkHash);
      await idbr.saveDataDefault(entity.pkHash, encryptedData);
      let entitySaved = await this.singleLoadExecute(idbr, pkHash);
      if (entitySaved === null) {
        continue;
      }
      let entityName = entitySaved.constructor.name;
      let entityList = savedDataMap[entityName];
      if (entityList === undefined) {
        entityList = [];
        savedDataMap[entityName] = entityList;
      }
      entityList.push(entitySaved);
    }
    return savedDataMap;
  }
  async delete(entity) {
    let idbr = await this.setPkHash(entity);
    return await idbr.deleteData(entity.pkHash);
  }
}
///////////////////////////////////////////////////////////
export default class DBControlUtil {
  constructor(authoricator) {
    if (impl === null) {
      impl = new DBControlUtilImpl(authoricator);
    }
  }
  async getIDBWrapper(entity) {
    return await impl.setPkHash(entity);
  }
  async getAllIDBWrappers() {
    return await impl.getAllIDBWrappers();
  }
  async singleLoad(entity) {
    let idbr = await this.setPkHash(entity);
    let pkHash = entity.pkHash;
    return await this.singleLoadExecute(idbr, pkHash);
  }
  async singleLoadExecute(idbr, pkHash) {
    let encrypted = await idbr.loadDataDefault(pkHash);
    let decryptedData = await imple.decrypData(encryptedData);
    if (decryptedData !== null) {
      let entity = imple.deserialize(decryptedData);
      if (entity !== null) {
        return entity;
      }
    }
    return null;
  }
  async decryptEntity(encryptedData){{
    let decrypDataList = await this.decrypDataList([encryptedData]);
    for(let jsonRecode of decrypDataList){
      let entity = imple.deserialize(jsonRecode);
      return entity;
    }
    return null;
  }
  async decrypEntityMap(DataList) {
    let resultMap = {};
    let decrypDataList = await this.decrypDataList(DataList);
    for(let jsonRecode of decrypDataList){
      let entity = imple.deserialize(jsonRecode);
      if(entity!== null){
        let entityName = entity.constructor.name;
        let list = resultMap[entityName];
        if(list === undefined){
          list = [];
          resultMap[entityName] = list;
        }
        list.push(entity);
      }
    }
    return resultMap;
  }
  async decrypDataList(DataList) {
    let resultList = [];
    for (let planeData of dataList) {
      let pkHash = planeData.pk;
      let encryptedData = planeData.data;
      let decryptedData = await imple.decrypData(encryptedData);
      if (decryptedData !== null) {
        resultList.push(decryptedData);
      }
    }
    return resultList;
  }
  async loadBinaryData(key) {}
  async saveAsEncryptedData(entity) {
    return await　imple.saveAsEncryptedData(entity);
  }
  async delete(entity) {
      return await　imple.delete(entity);
  }
  //　この処理がEntity定義地に呼ばれることを
  registerEntity(entity){
    impl.registerEntity(entity);
  }
  createEntity(entityName){
    return impl.createEntity(entityName);
  }
}
