import constant from '../constant'
import String2Buffer from '../core/string2Buffer'
import Webcrypter from '../core/crypt/webcrypter'
const DLMT = "_𩻩𩸕𩹉_";
export default class AuthoricatorImple {
  //引数つきコンストラクター
  constructor(userId) {
    this.userId = userId;
    this.EncryptionTokenAPrefix = "ETAP_";
    this.EncryptionTokenAKey = "";
    this.EncryptionTokenBPrefix = "ETBP_";
    this.EncryptionTokenBKey = "";
    let self = this;

    this.ua = constant.ua;
    this.domain = constant.domain;
    this.dbName = constant.dbName;
    this.appName = constant.appName;
    Webcrypter.hash(this.appName + DLMT + userId, this.EncryptionTokenAPrefix, this.dbName, 1).then((hash) => {
      self.EncryptionTokenAKey = String2Buffer.unitbs([
        String2Buffer.s2b(self.EncryptionTokenAPrefix),
        hash
      ]);
    }, (e) => {
      console.log("ERROR AuthoricatorImple.constructor @make EncryptionTokenAKey");
      console.log(e);
    });
    Webcrypter.hash(this.appName + DLMT + userId, this.EncryptionTokenBPrefix, this.dbName, 1).then((hash) => {
      self.EncryptionTokenBKey = String2Buffer.unitbs([
        String2Buffer.s2b(self.EncryptionTokenBPrefix),
        hash
      ]);
    }, (e) => {
      console.log("ERROR AuthoricatorImple.constructor @make EncryptionTokenBKey");
      console.log(e);
    });
  }
  // トークンはArrayBuffer
  async crateCryptKeyTokenA(passwd) {
    let now = Date.now();
    let nowArry = (new Uint8Array(String2Buffer.s2b(now))).reverse();
    return await Webcrypter.hash(this.appName + DLMT + this.userId + DLMT + String2Buffer.b2s(nowArry.buffer) + DLMT + this.ua + DLMT + this.domain, this.dbName + DLMT, DLMT + this.appName);
  }
  // トークンはArrayBuffer
  async crateCryptKeyTokenB(passwd,tokenA) {
    let now = Date.now();
    let nowArry = (new Uint8Array(String2Buffer.s2b(now))).reverse();
    return await Webcrypter.hash(this.appName + DLMT + this.userId + DLMT + String2Buffer.b2s(nowArry.buffer) + DLMT + this.ua + DLMT + this.domain + DLMT + tokenA, this.dbName + DLMT, DLMT + this.appName);
  }
  // keyはArrayBuffer
  async createCrypytKey(){
    return await Webcrypter.hash(this.appName + DLMT + this.userId  + DLMT + this.ua + DLMT + this.domain, this.dbName + DLMT, DLMT + this.appName);
  }
  // あんまり進歩はありませんが、ここでカプセル化しておく。
  async cryptTokenAbyKeyB(tokenA,keyB){
    return await Webcrypter.encrypt(keyB,tokenA);
  }
  // なんか区分値テーブルも隠したくなった。
  async cratePropertieOSName(){
    let nameSeed = this.domain + DLMT + this.dbName+ DLMT +this.appName+ DLMT +this.userId;
    return String2Buffer.b2Base64Url(await Webcrypter.hash(nameSeed, this.dbName + DLMT, DLMT + this.appName));
  }
  async saveKeys() {

  }
  async loadKeys() {}
}
