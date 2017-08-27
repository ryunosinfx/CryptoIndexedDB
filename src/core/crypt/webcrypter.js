import constant from '../constant'
import String2Buffer from './string2Buffer'
const AES_CBC = "AES-CBC";
const scubtleCrypto = crypto.subtle;
const iv = crypto.getRandomValues(new Uint8Array(12));
export default class WebCrypter {
  constructor() {
    this.iv = String2Buffer.s2b(constant.iv);
  }
  hash() {}
  //Data only String
  encrypt(key, dataString) {
    const algorithm = {
      name: AES_CBC,
      iv: this.iv
    };
    return new Promise((resolve, reject) => {
      scubtleCrypto.digest('SHA-256', key).then((keyBuffer) => {
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
  decrypt() {}

}
