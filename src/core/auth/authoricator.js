import constant from '../constant'
import String2Buffer from '../core/string2Buffer'
import Webcrypter from '../core/crypt/webcrypter'
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
