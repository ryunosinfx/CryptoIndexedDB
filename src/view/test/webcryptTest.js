import constant from '../../core/constant'
import Webcrypter from '../../core/crypt/webcrypter'
import {patch, h} from '../preLoader'
import String2Buffer from '../../core/crypt/string2Buffer'
export default class WebcryptTest {
  constructor() {
    this.constant = constant.dbName;
    this.webCrypter = new Webcrypter();
    //this.constant.strechCount = 1000;
  }
  async test(anckerVnode) {
    let {testString, salt1, salt2, hash, duration} = await this.hashTest();
    let {
      testPasswdString,
      testDataString,
      salt1e,
      salt2e,
      hashe,
      encrypted,
      decrypted,
      d1,
      d2,
      d3,
      d4
    } = await this.cryptTest();
    let newVnode = h('div#container.two.classes', {
      on: {
        click: () => {
          alert("here we are!");
          return false;
        }
      }
    }, [
      ' Hash+Strech1000Test!',
      h('br'),
      h('span', {}, "testString:" + testString),
      h('br'),
      h('span', {}, "salt1:" + salt1),
      h('br'),
      h('span', {}, "salt2:" + salt2),
      h('br'),
      h('span', {}, "hash:" + hash),
      h('br'),
      h('span', {}, 'The Duration Time:' + duration + "ms"),
      h('br'),
      h('br'),
      h('hr'),
      ' EncryptTest!',
      h('br'),
      h('span', {}, "testPasswdString:" + testPasswdString),
      h('br'),
      h('span', {}, "salt1e:" + salt1e),
      h('br'),
      h('span', {}, "salt2e:" + salt2e),
      h('br'),
      h('span', {}, "hashe:" + hashe),
      h('br'),
      h('span', {}, "testDataString:" + testDataString),
      h('br'),
      h('span', {}, "encrypted:" + encrypted),
      h('br'),
      h('span', {}, "decrypted:" + decrypted),
      h('br'),
      h('span', {}, 'The Duration Time1:' + d1 + "ms"),
      h('br'),
      h('span', {}, 'The Duration Time2:' + d2 + "ms"),
      h('br'),
      h('span', {}, 'The Duration Time3:' + d3 + "ms"),
      h('br'),
      h('span', {}, 'The Duration Time4:' + d4 + "ms"),
      h('br'),
      ' and this is still just normal text'
    ]);
    //alert("aaa anckerVnode:"+anckerVnode+"/newVnode:"+newVnode);
    patch(anckerVnode, newVnode);
  }
  async hashTest() {
    let testString = "aaaaa";
    let salt1 = "bbbb";
    let salt2 = "dddd";
    let starTime = Date.now();
    let hash = await this.webCrypter.hash(testString, salt1, salt2);

    let endTime = Date.now();
    let duration = endTime - starTime;
    return {testString, salt1, salt2, hash, duration};
  }
  async cryptTest() {
    console.log("a01");
    let testPasswdString = "aaaaa";
    let testDataString = "暗号化対象なう" + Date.now();
    let salt1e = "bbhashbb";
    let salt2e = "dddd";
    let starTime = Date.now();
    console.log("a02");
    let hashe = await this.webCrypter.hash(testPasswdString, salt1e, salt2e);

    console.log("a03");
    let endTime1 = Date.now();

    console.log("a04");
    let encryptedBuffer = await this.webCrypter.encryptString(hashe, testDataString);

    console.log("a05");
    let endTime2 = Date.now();

    console.log("a06");
    let encrypted = String2Buffer.b2Base64(encryptedBuffer);

    console.log("a07");
    let endTime3 = Date.now();
    console.log("a08");
    let decrypted = await this.webCrypter.decryptString(hashe, encryptedBuffer);

    console.log("a09");
    let endTime4 = Date.now();
    console.log("a10");
    let d1 = endTime1 - starTime;
    let d2 = endTime2 - endTime1;
    let d3 = endTime3 - endTime2;
    let d4 = endTime4 - endTime3;
    return {
      testPasswdString,
      testDataString,
      salt1e,
      salt2e,
      hashe,
      encrypted,
      decrypted,
      d1,
      d2,
      d3,
      d4
    };
  }

}
