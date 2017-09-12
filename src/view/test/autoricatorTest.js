import Authoricator from '../../core/auth/authoricatorImpl'
export default class AuthoricatorTest {
  constructor() {
    this.constant = constant.dbName;
    this.authoricator = new Authoricator();
    //this.constant.strechCount = 1000;
  }
  async test(anckerVnode) {
    let {userId,password,result01,result02,result03,result04,d1,d2,d3,d4} = await　this.login（）；
    let newVnode = h('div#container.two.classes', {
      on: {
        click: () => {
          alert("here we are!");
          return false;
        }
      }
    }, [
      h('hr'),
      h('h4', {}, ' Hash+Strech1000Test!!'),
      h('br'),
      h('span', {}, "userId:" + userId),
      h('br'),
      h('span', {}, "password:" + password),
      h('br'),
      h('span', {}, "result01:" + result01),
      h('br'),
      h('span', {}, 'The Duration Time:' + d1 + "ms"),
      h('br'),
      h('span', {}, "result02:" + result02),
      h('br'),
      h('span', {}, 'The Duration Time:' + d2 + "ms"),
      h('br'),
      h('span', {}, "result03:" + result03),
      h('br'),
      h('span', {}, 'The Duration Time:' + d3 + "ms"),
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
    const userId ="aaaa";
    const password = "bbbbb";
    let result01 = null;
    let t1 = Date.now();
    try{
      this.authoricator.signup(userId,password);
      this.authoricator.signin(userId,password);
      result01 = this.authoricator.isLogedIn();
    }catch(e){
      result01 = e;
    }
    let t2 = Date.now();
    let d1 = t2 -t1;
    let result02 = null;
    try{
      this.authoricator.activate(userId,password);
      this.authoricator.signin(userId,password);
      result02 = this.authoricator.isLogedIn();
    }catch(e){
      result02 = e;
    }
    let t3 = Date.now();
    let d2 = t3 -t2;
    let result03 = null;
    try{
      this.authoricator.signout();
      this.authoricator.signin(userId,password);
      this.authoricator.signout();
      result03 = this.authoricator.isLogedIn();
    }catch(e){
      result03 = e;
    }
    let t4 = Date.now();
    let d3 = t4 -t3;

    let result04 = null;
    let testDataA = "abababababa";
    try{
      this.authoricator.signout();
      this.authoricator.signin(userId,password);
      this.authoricator.signout();
      result04 = this.authoricator.isLogedIn();
    }catch(e){
      result04 = e;
    }
    let t5 = Date.now();
    let d4 = t5 -t4;

    return {userId,password,result01,result02,result03,result04,d1,d2,d3,d4}
  }
}
