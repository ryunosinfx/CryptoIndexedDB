import constant from '../constant'
import String2Buffer from '../crypt/string2Buffer'
import Webcrypter from '../crypt/webcrypter'
import idbr from '../idb/idbRapper'
const DLMT = "_𩻩𩸕𩹉_";
export default class AuthoricatorImple {
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
        console.log(hashValue);
        self.EncryptionTokenAKey = String2Buffer.unitbs([
          String2Buffer.s2b(self.EncryptionTokenAPrefix),
          String2Buffer.base642b(hashValue)
        ]);
      }, (e) => {
        console.log("ERROR AuthoricatorImple.constructor @make EncryptionTokenAKey");
        console.log(e);
      });
    });
    this.promiseB = new Promise((resolve) => {
      this.webCrypter.hash(this.appName + DLMT + userId, this.EncryptionTokenBPrefix, this.dbName, 3).then((hashValue) => {
        console.log(hashValue);
        self.EncryptionTokenBKey = String2Buffer.unitbs([
          String2Buffer.s2b(self.EncryptionTokenBPrefix),
          String2Buffer.base642b(hashValue)
        ]);
      }, (e) => {
        console.log("ERROR AuthoricatorImple.constructor @make EncryptionTokenBKey");
        console.log(e);
      });
    });
    this.promiseC = new Promise((resolve) => {
      this.webCrypter.hash(this.appName + DLMT + userId, this.EncryptionUserIdPrefix, this.dbName, 4).then((hashValue) => {
        console.log(hashValue);
        self.EncryptionUserIdKey = String2Buffer.unitbs([
          String2Buffer.s2b(self.EncryptionUserIdPrefix),
          String2Buffer.base642b(hashValue)
        ]);
      }, (e) => {
        console.log("ERROR AuthoricatorImple.constructor @make EncryptionUserIdKey");
        console.log(e);
      });
    });
    this.osName = null;
  }
  async waitInit() {
    await Promise.all([this.promiseA,this.promiseB,this.promiseC]);
  }
  // トークンはArrayBuffer
  async crateCryptKeyTokenA(passwd) {
    let now = Date.now();
    let nowArry = (new Uint8Array(String2Buffer.s2b(now))).reverse();
    return await Webcrypter.hash(this.appName + DLMT + this.userId + DLMT + String2Buffer.b2s(nowArry.buffer) + DLMT + this.ua + DLMT + this.domain, this.dbName + DLMT, DLMT + this.appName);
  }
  // トークンはArrayBuffer
  async crateCryptKeyTokenB(passwd, tokenA) {
    let now = Date.now();
    let nowArry = (new Uint8Array(String2Buffer.s2b(now))).reverse();
    return await Webcrypter.hash(this.appName + DLMT + this.userId + DLMT + String2Buffer.b2s(nowArry.buffer) + DLMT + this.ua + DLMT + this.domain + DLMT + tokenA, this.dbName + DLMT, DLMT + this.appName);
  }
  // keyはArrayBuffer
  async createStep1CrypytKey(passwd) {
    return await Webcrypter.hash(this.appName + DLMT + this.userId + DLMT + passwd + DLMT + this.ua + DLMT + this.domain, this.dbName + DLMT, DLMT + this.appName);
  }
  async createTokenC(passwd){
    return await Webcrypter.hash( this.userId + DLMT + passwd + DLMT + this.ua, this.dbName + DLMT, DLMT + this.appName);
  }
  async createTokenD(passwd){
    return await Webcrypter.hash( this.userId + DLMT + this.ua, this.dbName + DLMT, DLMT + this.appName);
  }
  isEqualDualAllayBuffers(bufferA,bufferB){
    return String2Buffer.b2Base64Url(bufferA) === String2Buffer.b2Base64Url(bufferB);
  }
  // keyはArrayBuffer
  async createStep2CrypytKey(passwdHash,tokenA,tokenB) {
    let array = new Uint8Array(String2Buffer.unitbs(passwdHash,tokenA,tokenB));
    return array.reverse().buffer;
  }
  // あんまり進歩はありませんが、ここでカプセル化しておく。
  async cryptTokenAbyKeyB(tokenA, keyB) {
    return await this.encrypt(keyB, tokenA);
  }
  // あんまり進歩はありませんが、ここでカプセル化しておく。
  async encrypt(keyBuffer, dataBuffer) {
    return await Webcrypter.encrypt(keyBuffer, dataBuffer);
  }
  // あんまり進歩はありませんが、ここでカプセル化しておく。
  async decrypt(keyBuffer, dataBuffer) {
    return await Webcrypter.decrypt(keyBuffer, dataBuffer);
  }
  // なんか区分値テーブルも隠したくなった。
  async cratePropertieOSName() {
    let nameSeed = this.domain + DLMT + this.dbName + DLMT + this.appName + DLMT + this.userId;
    return String2Buffer.b2Base64Url(await Webcrypter.hash(nameSeed, this.dbName + DLMT, DLMT + this.appName));
  }
  async init() {
    if (this.osName === null) {
      this.osName = await this.cratePropertieOSName();
      this.idbr = new idbr(this.osName);
      try {
        await this.idbr.isFished();
      } catch (e) {
        // momiee
      }
    }
  }
  async saveKeys(key, data) {
    await this.init();
    await this.idbr.saveDataDefault(key, data);
  }
  async loadKeys(key) {
    return await this.idbr.loadDataDefault(key);
  }
}
