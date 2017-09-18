import constant from '../../core/constant'
import Authoricator from '../../core/auth/authoricator'
import {patch, h} from '../preLoader'
export default class AuthoricatorTest {
  constructor() {
    this.constant = constant.dbName;
    this.authoricator = new Authoricator();
    //this.constant.strechCount = 1000;
  }
  async test(anckerVnode) {
    let {userId,password,result01,result02,result03,result04,d1,d2,d3,d4} = await this.login();
    let newVnode = h('div#container.two.classes', {
      on: {
        click: () => {
          alert("here we are!");
          return false;
        }
      }
    }, [
      h('hr'),
      h('h4', {}, ' data+AuthoricatorTest!!'),
      h('br'),
      h('span', {}, "userId:" + userId),
      h('br'),
      h('span', {}, "password:" + password),
      h('br'),
      h('span', {}, "result01 OK Value:true/true/true/" ),
      h('br'),
      h('span', {}, "result01:" + result01),
      h('br'),
      h('span', {}, 'The Duration Time:' + d1 + "ms"),
      h('br'),
      h('br'),
      h('span', {}, "result02 OK Value:/true/true/true/" ),
      h('br'),
      h('span', {}, "result02:" + result02),
      h('br'),
      h('span', {}, 'The Duration Time:' + d2 + "ms"),
      h('br'),
      h('br'),
      h('span', {}, "result03 OK Value:/true/true/true/false" ),
      h('br'),
      h('span', {}, "result03:" + result03),
      h('br'),
      h('span', {}, 'The Duration Time:' + d3 + "ms"),
      h('br'),
      h('br'),
      h('span', {}, "result04 OK Value:/true/false/false/true/true" ),
      h('br'),
      h('span', {}, "result04:" + result04),
      h('br'),
      h('span', {}, 'The Duration Time:' + d4 + "ms"),
      h('br')
    ]);
    //alert("aaa anckerVnode:"+anckerVnode+"/newVnode:"+newVnode);
    patch(anckerVnode, newVnode);
  }
  async login() {
    console.log("AuthoricatorTest---a001");
    const userId ="aaaa";
      console.log("AuthoricatorTest---a002");
    const password = "bbbbb";
      console.log("AuthoricatorTest---a003");
    let result01 = null;
      console.log("AuthoricatorTest---a004");
    let t1 = Date.now();
    try{
      console.log("AuthoricatorTest---a01");
      result01 = await this.authoricator.signup(userId,password)+"/";
      console.log("AuthoricatorTest---a02");
      result01 += await this.authoricator.signin(userId,password)+"/";
      console.log("AuthoricatorTest---a03");
      let result01isLogedIn = await this.authoricator.isLogedIn()+"/";
      result01 +=""+result01isLogedIn;
      // false is valid
      console.log("AuthoricatorTest---a04 result01isLogedIn:"+result01isLogedIn);
    }catch(e){
      result01 = e;
    }
    let t2 = Date.now();
    let d1 = t2 -t1;
    let result02 = null;
    try{
      console.log("AuthoricatorTest---b01");
      result02 = await this.authoricator.activate(userId,password)+"/";
      console.log("AuthoricatorTest---b02");
      result02 += await this.authoricator.signin(userId,password)+"/";
      console.log("AuthoricatorTest---b03");
      result02 += await this.authoricator.isLogedIn()+"/";
      console.log("AuthoricatorTest---b04");
    }catch(e){
      result02 = e;
    }
    let t3 = Date.now();
    let d2 = t3 -t2;
    let result03 = null;
    try{
      console.log("AuthoricatorTest---c01");
      result03 = await this.authoricator.signout()+"/";
        console.log("AuthoricatorTest---c02");
      result03 += await this.authoricator.signin(userId,password)+"/";
        console.log("AuthoricatorTest---c03");
      result03 += await this.authoricator.signout()+"/";
        console.log("AuthoricatorTest---c04");
      result03 += await this.authoricator.isLogedIn();
      // false is valid
        console.log("AuthoricatorTest---c05");
    }catch(e){
      result03 = e;
    }
    let t4 = Date.now();
    let d3 = t4 -t3;

    let result04 = null;
    let inValidPassWord = "abababababa";
    try{
      console.log("AuthoricatorTest---d01");
      result04 = await this.authoricator.signout()+"/";
        console.log("AuthoricatorTest---d02");
      result04 += await this.authoricator.signin(userId,inValidPassWord)+"/";
        console.log("AuthoricatorTest---d03");
      result04 += await this.authoricator.isLogedIn()+"/";
        console.log("AuthoricatorTest---d04");
        result04 += await this.authoricator.signin(userId,password)+"/";
          console.log("AuthoricatorTest---d05");
        result04 += await this.authoricator.isLogedIn();
          console.log("AuthoricatorTest---d07");
    }catch(e){
      result04 = e;
    }
    let t5 = Date.now();
    let d4 = t5 -t4;
      console.log("AuthoricatorTest---z01");

    return {userId,password,result01,result02,result03,result04,d1,d2,d3,d4}
  }
}
