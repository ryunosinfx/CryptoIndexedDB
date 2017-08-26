import constant from './constant'
export default class Authoricator {
  //引数なしコンストラクター
  constructor() {
    this.ua = constant.ua;
      this.domain = constant.domain;
        this.constant = constant.dbName;
  }
  //ログイン
  signup(userId,passwd){
    //ここであれする。
    let now = Date.now();
    let tokenA = 
  }
  //ログイン
  signin(userId,passwd){

  }
  //ログアウト
  signout(userId,passwd){

  }
  //ログイン
  activate(userId,passwd){

  }

}
