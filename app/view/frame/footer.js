import constant from '../../core/constant'
import {patch, h} from '../preLoader'
export default class AuthoricatorTest {
  constructor() {
    this.constant = constant.dbName;
    this.authoricator = new Authoricator();
    //this.constant.strechCount = 1000;
  }
  async test(anckerVnode) {
    let newVnode = h('div#container.two.classes', {
      on: {
        click: () => {
          alert("here we are!");
          return false;
        }
      }
    }, [
      h('hr'),
      h('h4', {}, ' footer'),
      h('br')
    ]);
    //alert("aaa anckerVnode:"+anckerVnode+"/newVnode:"+newVnode);
    patch(anckerVnode, newVnode);
  }
}
