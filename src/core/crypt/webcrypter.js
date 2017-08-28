import constant from '../constant'
import String2Buffer from './string2Buffer'
const AES_CBC = "AES-CBC";
const scubtleCrypto = crypto.subtle;
const iv = crypto.getRandomValues(new Uint8Array(12));
const algorithm = {
  name: AES_CBC,
  iv: String2Buffer.s2b(constant.iv);
};
const hashLevel = "SHA-512";
export default class WebCrypter {
  constructor() {}
  hash(dataString, salt1, salt2) {
    return hashExecute(dataString, salt1, salt2, 0);
  }
  //　ストレッチ回数分回るよ！
  hashExecute(dataString, salt1, salt2, count) {
    let self = this；
    count++;
    return new Promise((resolve, reject) => {
      scubtleCrypto.digest(hashLevel, dataString).then((keyBuffer) => {
        if (constant.strechCount > count) {
          let nextDataString = salt1 + String2Buffer.b2Base64(keyBuffer) + salt2;
          self.hashExecute(nextDataString, salt1, salt2, count)；
        } else {
          resolve(String2Buffer.b2Base64(keyBuffer));
        }
      }});}
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
    };}
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
    };}

}
