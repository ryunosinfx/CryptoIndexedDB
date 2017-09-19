import constant from '../core/constant'
export default class Entity {
  constructor(key, data = null) {
    this.constant = constant.dbName;
    this.key = key;
    this.data = data;
  }
  get key(){

  }
  set key(data = null){
    //なにもしない。
  }
  get data(){

  }
  set data(data = null){

  }
}
