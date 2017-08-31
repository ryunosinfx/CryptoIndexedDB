import constant from '../../core/constant'
import Webcrypter from '../../core/crypt/webcrypter'
import {patch, h} from '../preLoader'
import String2Buffer from '../../core/crypt/string2Buffer'
export default class WebcryptTest {
  constructor() {
    this.constant = constant.dbName;
    this.webCrypter = new Webcrypter();
  }
  async test(anckerVnode) {
    let {testString,salt1,salt2,hash,duration} = await this.hashTest();
    let newVnode = h('div#container.two.classes', {
      on: {
        click: () => {
          alert("here we are!");
          return false;
        }
      }
    }, [
      h('span', {}, "testString:" + testString),
      h('br'),
      h('span', {}, "salt1:" + salt1),
      h('br'),
      h('span', {}, "salt2:" + salt2),
      h('br'),
      h('span', {
        style: {
          fontWeight: 'normal',
          fontStyle: 'italic'
        }
      }, 'The Duration Time:'+duration+"ms"),
      h('br'),
      h('span', {}, "hash:" + hash),
      h('br'),
      ' and this is still just normal text'
    ]);
    //alert("aaa anckerVnode:"+anckerVnode+"/newVnode:"+newVnode);
    patch(anckerVnode, newVnode);
  }
  async hashTest(){
    let testString = "aaaaa";
    let salt1 = "bbbb";
    let salt2 = "dddd";
    let starTime = Date.now();
    let hash = await this.webCrypter.hash(testString, salt1, salt2);

    let endTime = Date.now();
    let duration = endTime - starTime;
    return {testString,salt1,salt2,hash,duration};
  }

}
