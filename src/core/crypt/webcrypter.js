import constant from '../constant'
import String2Buffer from './string2Buffer'
const AES_CBC = "AES-CBC";
const scubtleCrypto = crypto.subtle;
const iv = crypto.getRandomValues(new Uint8Array(12));
const algorithm = {
  name: AES_CBC,
  iv: String2Buffer.s2b(constant.iv)
};
const hashLevel = "SHA-512";
export default class WebCrypter {
  constructor() {}
  async hash(dataString, salt1, salt2) {
    let dataBuffer = String2Buffer.s2b(dataString);
    return await this.hashExecute(dataBuffer, salt1, salt2, 0);
  }
  //　ストレッチ回数分回るよ！
  async hashExecute(dataString, salt1, salt2, count) {
    let self = this
    count++;
    let keyBuffer = await scubtleCrypto.digest(hashLevel, dataString);
    if (constant.strechCount > count) {
      let nextDataString = salt1 + String2Buffer.b2Base64(keyBuffer) + salt2;
      let nextDataBuffer = String2Buffer.s2b(dataString);
      return await self.hashExecute(nextDataBuffer, salt1, salt2, count);
    } else {
      return String2Buffer.b2Base64(keyBuffer);
    }
    return
  }
  //Data only String, you need JSON.stringify.
  encrypt(key, dataString) {
    return new Promise((resolve, reject) => {
      scubtleCrypto.digest(hashLevel, key).then((keyBuffer) => {
        //buffer is binary
        let dataBuffer = String2Buffer.s2b(dataString);
        scubtleCrypto.encrypt(algorithm, keyBuffer, dataBuffer).then((result) => {
          resolve(result);
        }, (e) => {
          console.log(e);
          reject(e);
        });

      }, (e) => {
        console.log(e);
        reject(e);
      });
    });
  }
  //
  decrypt(key, cryptBuffer) {
    return new Promise((resolve, reject) => {
      scubtleCrypto.digest(hashLevel, key).then((keyBuffer) => {
        //buffer is binary
        scubtleCrypto.decrypt(algorithm, keyBuffer, cryptBuffer).then((result) => {
          let resultString = String2Buffer.s2b(result);
          resolve(resultString);
        }, (e) => {
          console.log(e);
          reject(e);
        });

      }, (e) => {
        console.log(e);
        reject(e);
      });
    });
  }

}
