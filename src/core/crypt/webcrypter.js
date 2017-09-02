import constant from '../constant'
import String2Buffer from './string2Buffer'
const AES_CBC = "AES-CBC";
const scubtleCrypto = crypto.subtle;
const iv = crypto.getRandomValues(new Uint8Array(12));
const algorithm = {
  name: AES_CBC,
  iv: String2Buffer.s2b(constant.iv)
};
const algo = {
  name: AES_CBC,
  length: 256
};
const extractable = false;
const keyUsages = ["encrypt", "decrypt"];
const hashLevel = "SHA-512";
export default class WebCrypter {
  constructor() {}
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

   convertToKey(keyBuffer) {
    alert(String2Buffer.b2Base64(keyBuffer));
     alert(String2Buffer.b2Base64Url(keyBuffer));
    return scubtleCrypto.importKey("jwk", { //this is an example jwk key, "raw" would be an ArrayBuffer
      kty: "oct",
      k: "Y0zt37HgOx-BY7SQjYVmrqhPkO44Ii2Jcb9yydUDPfE",
      //String2Buffer.b2Base64Url(keyBuffer),
      alg: "A256CBC",
      ext: true
    }, {
      name: "AES-CBC"
    }, false, ["encrypt", "decrypt"]).then((key)=>{alert(key)},(e)=>{console.log(e.stack);alert(e)});
  }
  //Data only String, you need JSON.stringify.
  async encryptString(keyString, dataString) {
    console.log("es01");
    let keyBaseBuffer = String2Buffer.s2b(keyString);
      console.log("es02");
    let dataBuffer = String2Buffer.s2b(dataString);
      console.log("es03");
    return await this.encrypt(keyBaseBuffer, dataBuffer);
  }
  //Data only String, you need JSON.stringify.
  async encrypt(keyBaseBuffer, dataBuffer) {
    console.log("e01");
    let keyBuffer = await scubtleCrypto.digest(hashLevel, keyBaseBuffer);
      console.log("e02");
    let key = this.convertToKey(keyBuffer);
      console.log("e03");
    let result = await scubtleCrypto.encrypt(algorithm, key, dataBuffer);
      console.log("e04");
    return result;
  }
  //
  async decrypt(keyBaseBuffer, cryptBuffer) {
    let keyBuffer = scubtleCrypto.digest(hashLevel, keyBaseBuffer);
    let key = await this.convertToKey(keyBuffer);
    let result = scubtleCrypto.decrypt(algorithm, key, cryptBuffer);
    return result;
  }
  //
  async decryptString(keyString, cryptBuffer) {
    let keyBaseBuffer = String2Buffer.s2b(keyString);
    let keyBuffer = scubtleCrypto.digest(hashLevel, keyBaseBuffer);
    let result = await this.decrypt(keyBaseBuffer, dataBuffer);
    let resultString = String2Buffer.s2b(result);
    return resultString;
  }
}
