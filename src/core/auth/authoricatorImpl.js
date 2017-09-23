import constant from '../constant'
import String2Buffer from '../crypt/string2Buffer'
import Webcrypter from '../crypt/webcrypter'
import idbr from '../idb/idbRapper'
const DLMT = "_𩻩𩸕𩹉_";
export default class AuthoricatorImpl {
  //引数つきコンストラクター
  constructor(userId) {
    this.userId = userId;
    this.EncryptionTokenAPrefix = "ETAP_";
    this.EncryptionTokenAKey = "";
    this.EncryptionTokenBPrefix = "ETBP_";
    this.EncryptionUserIdPrefix = "ETBUID_";
    this.EncryptionTokenBKey = "";
    let self = this;

    this.webCrypter = new Webcrypter();
    this.ua = constant.ua;
    this.domain = constant.domain;
    this.dbName = constant.dbName;
    this.appName = constant.appName;
    this.promiseA = new Promise((resolve) => {
      this.webCrypter.hash(this.appName + DLMT + userId, this.EncryptionTokenAPrefix, this.dbName, 2).then((hashValue) => {
        //console.log(hashValue);
        self.EncryptionTokenAKey = String2Buffer.unitbs([
          String2Buffer.s2b(self.EncryptionTokenAPrefix),
          String2Buffer.base642b(hashValue)
        ]);
        resolve(self.EncryptionTokenAKey);
      }, (e) => {
        console.log("ERROR AuthoricatorImpl.constructor @make EncryptionTokenAKey");
        console.log(e);
        resolve(e);
      });
    });
    this.promiseB = new Promise((resolve) => {
      this.webCrypter.hash(this.appName + DLMT + userId, this.EncryptionTokenBPrefix, this.dbName, 3).then((hashValue) => {
        //console.log(hashValue);
        self.EncryptionTokenBKey = String2Buffer.unitbs([
          String2Buffer.s2b(self.EncryptionTokenBPrefix),
          String2Buffer.base642b(hashValue)
        ]);
        resolve(self.EncryptionTokenBKey);
      }, (e) => {
        console.log("ERROR AuthoricatorImpl.constructor @make EncryptionTokenBKey");
        console.log(e);
        resolve(e);
      });
    });
    this.promiseC = new Promise((resolve) => {
      this.webCrypter.hash(this.appName + DLMT + userId, this.EncryptionUserIdPrefix, this.dbName, 4).then((hashValue) => {
        //console.log(hashValue);
        self.EncryptionUserIdKey = String2Buffer.unitbs([
          String2Buffer.s2b(self.EncryptionUserIdPrefix),
          String2Buffer.base642b(hashValue)
        ]);
        resolve(self.EncryptionUserIdKey);
      }, (e) => {
        console.log("ERROR AuthoricatorImpl.constructor @make EncryptionUserIdKey");
        console.log(e);
        resolve(e);
      });
    });
    this.osName = null;
  }
  waitInit() {
    return Promise.all([this.promiseA, this.promiseB, this.promiseC]);
  }
  // トークンはArrayBuffer
  async crateCryptKeyTokenA(passwd) {
    let now = Date.now();
    let seed = now + DLMT + Math.floor(Math.random() * (parseInt(now) - 0 + 1)) + 0;
    let nowArry = (new Uint8Array(String2Buffer.s2b(seed))).reverse();
    let cryptKeyTokenA = await this.webCrypter.hash(this.appName + DLMT + this.userId + DLMT + String2Buffer.b2s(nowArry.buffer) + DLMT + this.ua + DLMT + this.domain, this.dbName + DLMT, DLMT + this.appName);
    return String2Buffer.s2b(cryptKeyTokenA);
  }
  // トークンはArrayBuffer
  async crateCryptKeyTokenB(passwd, tokenA) {
    let now = Date.now();
    let seed = now + DLMT + Math.floor(Math.random() * (parseInt(now) - 0 + 1)) + 0;
    let nowArry = (new Uint8Array(String2Buffer.s2b(seed))).reverse();
    let cryptKeyTokenB = await this.webCrypter.hash(this.appName + DLMT + this.userId + DLMT + String2Buffer.b2s(nowArry.buffer) + DLMT + this.ua + DLMT + this.domain + DLMT + tokenA, this.dbName + DLMT, DLMT + this.appName);
    return String2Buffer.s2b(cryptKeyTokenB);
  }
  // keyはArrayBuffer
  async createStep1CrypytKey(passwd) {
    let step1CrypytKey = await this.webCrypter.hash(this.appName + DLMT + this.userId + DLMT + passwd + DLMT + this.ua + DLMT + this.domain, this.dbName + DLMT, DLMT + this.appName);
    return String2Buffer.s2b(step1CrypytKey);
  }
  async createTokenC(passwd) {
    let tokenC = await this.webCrypter.hash(this.userId + DLMT + passwd + DLMT + this.ua, this.dbName + DLMT, DLMT + this.appName);
    return String2Buffer.s2b(tokenC);
  }
  async createTokenD(passwd) {
    let tokenD = await this.webCrypter.hash(this.userId + DLMT + this.ua, this.dbName + DLMT, DLMT + this.appName);
    return String2Buffer.s2b(tokenD);
  }
  isEqualDualAllayBuffers(bufferA, bufferB) {
    return String2Buffer.b2Base64Url(bufferA) === String2Buffer.b2Base64Url(bufferB);
  }
  // keyはArrayBuffer
  async createStep2CrypytKey(passwdHash, tokenA, tokenB) {
    if ((passwdHash instanceof ArrayBuffer) && (tokenA instanceof ArrayBuffer) && (tokenB instanceof ArrayBuffer)) {
      let array = new Uint8Array(String2Buffer.unitbs(passwdHash, tokenA, tokenB));
      return array.reverse().buffer;
    }
    return null;
  }
  // あんまり進歩はありませんが、ここでカプセル化しておく。
  async cryptTokenAbyKeyB(tokenA, keyB) {
    return await this.encrypt(keyB, tokenA);
  }
  // あんまり進歩はありませんが、ここでカプセル化しておく。
  async encrypt(key, data) {
    //console.log(typeof key);
    //console.log(typeof data);
    let keyBuffer = typeof key === "string"
      ? String2Buffer.s2b(key)
      : key;
    let dataBuffer = typeof data === "string"
      ? String2Buffer.s2b(data)
      : data;
    let encrypted = await this.webCrypter.encrypt(keyBuffer, dataBuffer);
    // console.log("encrypt 001 keyBuffer:"+String2Buffer.b2Base64Url(keyBuffer)+"/data:"+data+"/encrypted:"+String2Buffer.b2Base64Url(encrypted));
    return encrypted;
  }
  // あんまり進歩はありませんが、ここでカプセル化しておく。
  async decrypt(key, data) {
    //console.log(typeof key);
    //console.log(typeof data);
    if (key === null || data === null) {
      throw "DECRYPTION_ERROR_DATA_IS_NULL key:" + key + "/data:" + data;
    }
    let keyBuffer = typeof key === "string"
      ? String2Buffer.s2b(key)
      : key;
    let dataBuffer = typeof data === "string"
      ? String2Buffer.s2b(data)
      : data;
    // console.log("decrypt 001 keyBuffer:"+String2Buffer.b2Base64Url(keyBuffer)+"/data:"+data+"/encrypted:"+String2Buffer.b2Base64Url(dataBuffer));
    return await this.webCrypter.decrypt(keyBuffer, dataBuffer);
  }
  // 区分値テーブルも隠す
  async cratePropertieOSName() {
    let nameSeed = this.domain + DLMT + this.dbName + DLMT + this.appName + DLMT + this.userId;
    let key = await this.webCrypter.hash(nameSeed, this.dbName + DLMT, DLMT + this.appName, 100);
    return String2Buffer.b2Base64Url(String2Buffer.base642b(key));
  }
  // key1 is EntityName, key2 is pk.
  async crateOSName(key1,key2="") {
    let nameSeed = this.domain + DLMT + key1 + DLMT + this.appName + DLMT + this.userId;
    let key = await this.webCrypter.hash(nameSeed, key2 + DLMT, DLMT + this.appName, 10);
    return String2Buffer.b2Base64Url(String2Buffer.base642b(key));
  }
  async init() {
    //console.log("init null is Valid 001:" + this.osName);
    if (this.osName === null) {
      //console.log("init null is Valid 002:" + this.osName);
      this.osName = await this.cratePropertieOSName();
      //console.log("init 003:" + this.osName);
      this.idbr = new idbr(this.osName);
      //console.log("init 004:" + this.osName);
      try {
        await this.idbr.isFished();
      } catch (e) {
        // momiee
        alert("init!!!!!!error!!!");
        alert(e);
      }
    }
  }
  async saveKeys(key, data) {
    let key4idb = (typeof key === "object")
      ? String2Buffer.b2Base64Url(key)
      : key;
    //console.log("saveKeys 001" + key + "/" + this.init);
    if (!!this.idbr === false) {
      //console.log("saveKeys 002" + key + "/" + this.init);
      await this.init();
    }
    try {
      //console.log("saveKeys 003" + key + "/" + this.init);
      await this.idbr.saveDataDefault(key4idb, data);
    } catch (e) {
      alert("init!!!!!!error!!!");
      alert(e);
    }
    // console.log("saveKeys 004 SUCCESS!! :" + key4idb + "/" + String2Buffer.b2Base64Url(data));
  }
  async loadKeys(key) {
    let key4idb = (typeof key === "object")
      ? String2Buffer.b2Base64Url(key)
      : key;
    //console.log("loadKeys 001" + this.init);
    if (!!this.idbr === false) {
      //console.log("loadKeys 002" + this.init);
      await this.init();
    }
    //console.log("loadKeys 003 this.idbr:" + !!this.idbr);
    try {
      let loaded = await this.idbr.loadDataDefault(key4idb);
      // console.log("loadKeys 004 key4idb:"+key4idb+"/loaded:" +  String2Buffer.b2Base64Url(loaded));
      return loaded;
    } catch (e) {
      alert("loadKeys!!!!!!error!!!");
      alert(e);
    }
  }
}
