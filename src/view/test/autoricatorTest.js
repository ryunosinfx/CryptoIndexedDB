import Authoricator from '../../core/auth/authoricatorImpl'
export default class AuthoricatorTest {
  constructor() {
    this.constant = constant.dbName;
    this.authoricator = new Authoricator();
    //this.constant.strechCount = 1000;
  }
  async test(anckerVnode) {
    let {testString, salt1, salt2, hash, duration} = await this.hashTest();
    let {
      testPasswdString,
      testPasswdString2,
      testDataString,
      salt1e,
      salt2e,
      hashe,
      hashe2,
      encrypted,
      decrypted,
      decrypted2,
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
      h('hr'),
      h('h4', {}, ' Hash+Strech1000Test!!'),
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
      h('h4', {}, ' EncryptTest!'),
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
      h('h5', {}, ' EncryptTest! ErrorCase'),
      h('br'),
      h('span', {}, "testPasswdString:" + testPasswdString2),
      h('br'),
      h('span', {}, "hashe2:" + hashe2),
      h('br'),
      h('span', {}, "decrypted2:" + decrypted2),
      h('br')
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
  async login() {
    const userId ="aaaa";
    const password = "bbbbb";
    let result01 = null;
    try{
      this.authoricator.signup(userId,password);
      this.authoricator.signin(userId,password);
      result01 = this.authoricator.isLogedIn();
    }catch(e){
      result01 = e;
    }
    let result02 = null;
    try{
      this.authoricator.activate(userId,password);
      this.authoricator.signin(userId,password);
      result02 = this.authoricator.isLogedIn();
    }catch(e){
      result02 = e;
    }
    let result03 = null;
    try{
      this.authoricator.signout();
      this.authoricator.signin(userId,password);
      this.authoricator.signout();
      result03 = this.authoricator.isLogedIn();
    }catch(e){
      result03 = e;
    }

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
  }
}
