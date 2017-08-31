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
    let testString = "aaaaa";
    let salt1 = "bbbb";
    let salt2 = "dddd";
    let starTime = Date.now();
    let hash = await this.webCrypter.hash(testString, salt1, salt2);

    let endTime = Date.now();
    let duration = endTime - starTime;
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
      }, 'This is now italic type'),
      ' and this is still just normal text',
      h('a', {
        props: {
          href: '/'
        }
      }, 'I\'OK')
    ]);
    patch(anckerVnode, newVnode);
  }

}
