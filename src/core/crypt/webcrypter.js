import constant from '../constant'
import String2Buffer from './string2Buffer'
const scubtleCrypto = crypto.subtle;
const algorithm = {
  name: "AES-CBC",
  iv: ""
};
const extractable = true;
const hashLevel = "SHA-256";
export default class WebCrypter {
  constructor() {
    scubtleCrypto.digest(hashLevel, String2Buffer.s2b(constant.iv)).then((hash) => {
      let hash32 = new Uint8Array(hash);
      let lenHalf = Math.ceil(hash32.length / 2);
      let iv = new Uint8Array(16)
      for (let i = 0; i < lenHalf; i++) {
        iv[i] = hash32[i] ^ hash32[lenHalf + i]; //XORで
      };
      algorithm.iv = iv; //String2Buffer.b2Base64Url(hash);
    }, (e) => {
      alert(e)
    });
  }
  async hash(dataString, salt1, salt2) {
    let dataBuffer = String2Buffer.s2b(dataString);
    return await this.hashExecute(dataBuffer, String2Buffer.s2b(salt1), String2Buffer.s2b(salt2), 0);
  }
  //　ストレッチ回数分回るよ！
  async hashExecute(dataBuffer, salt1, salt2, count) {
    let self = this
    count++;
    let keyBuffer = await scubtleCrypto.digest(hashLevel, dataBuffer);
    if (constant.strechCount > count) {
      let nextDataBuffer = String2Buffer.unitbs([salt1, keyBuffer, salt2]);
      return await self.hashExecute(nextDataBuffer, salt1, salt2, count);
    } else {
      return String2Buffer.b2Base64(keyBuffer);
    }
    return
  }

  async convertToKey(keyBuffer) {
    return await scubtleCrypto.importKey(
    //   "jwk", { //this is an example jwk key, "raw" would be an ArrayBuffer
    //   kty: "oct",
    //   k: String2Buffer.b2Base64Url(keyBuffer),
    //   alg: "A256CBC",
    //   ext: true
    // }, algorithm, false,
    //  ["encrypt", "decrypt"]
    //
    "raw", keyBuffer, algorithm, extractable, ["encrypt", "decrypt"]);
  }
  //Data only String, you need JSON.stringify.
  async encryptString(keyString, dataString) {
    let keyBaseBuffer = String2Buffer.s2b(keyString);
    let dataBuffer = String2Buffer.s2b(dataString);
    return await this.encrypt(keyBaseBuffer, dataBuffer);
  }
  //Data only String, you need JSON.stringify.
  async encrypt(keyBaseBuffer, dataBuffer) {
    let keyBuffer = await scubtleCrypto.digest(hashLevel, keyBaseBuffer);
    let key = await this.convertToKey(keyBuffer);
    let algo = {
      name: key.algorithm.name,
      length: key.algorithm.length,
      iv: algorithm.iv
    };
    let result = await scubtleCrypto.encrypt(algo, key, dataBuffer);
    return result;
  }
  // invalidKeyHash is throw error!
  async decrypt(keyBaseBuffer, cryptBuffer) {
    try {
      let keyBuffer = await scubtleCrypto.digest(hashLevel, keyBaseBuffer);
      let key = await this.convertToKey(keyBuffer);
      let algo = {
        name: key.algorithm.name,
        length: key.algorithm.length,
        iv: algorithm.iv
      };
      let result = await scubtleCrypto.decrypt(algo, key, cryptBuffer);
      return result;
    } catch (e) {
      throw e + 'error'
    }
  }
  //
  async decryptString(keyString, cryptBuffer) {

    try {
      let keyBaseBuffer = String2Buffer.s2b(keyString);
      let result = await this.decrypt(keyBaseBuffer, cryptBuffer);
      let resultString = String2Buffer.b2s(result);
      return resultString;
    } catch (e) {
      throw e + 'error'
    }
  }
}
