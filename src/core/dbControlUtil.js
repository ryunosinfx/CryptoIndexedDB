import constant from './constant'
import idbr from './idb/idbRapper'
import Entity from '../entity/entity'
const impl = null;
const idbWrppers = {};
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
      : awate this.loadIDBWrappers();
  }
  async decrypData(encryptedData) {
    try {
      return await this.authoricator.decrypt(encryptedData);
    } catch (e) {
      return null;
    }
  }

  async deserializer(dataBuffer) {
    
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////
  async serialize(entity, resultData = {}, pkHashCalced) {
    let pk = entity.pk;
    let entityName = entity.constructor.name;
    let pkHash = pkHashCalced !== undefined ? pkHashCalced:await this.authoricator.crateOSName(entityName, pk);
    let serialData = {};
    let serial = {
      pk: pkHash,
      type: entityName,
      data: serialData
    };
    for (let key in entity) {
      let value = entity[key];
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
    if (!!entity.isUpdated === false) {
      return resultData;
    }
    resultData[pkHash] = JSON.sringify(serial);
    return
  }

  ///////////////////////////////////////////////////////////
  export default class DBControlUtil {
    constructor(authoricator) {
      if (impl === null) {
        impl = new DBControlUtilImpl();
      }
    }
    async getIDBWrapper(entity) {
      return await impl.setPkHash(entity);
    }
    async getAllIDBWrappers() {
      return await impl.getAllIDBWrappers();
    }
    async singleLoad(entity) {
      let idbr = awaite this.setPkHash(entity);
      let pkHash = entity.pkHash;
      let encrypted = await idbr.loadDataDefault(pkHash);
      let decryptedData = await imple.decrypData(encryptedData);
      if (decryptedData !== null) {}
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
  }
