import constant from '../core/constant'

export default class Entity {
  constructor(key, data = null, pkHash = null) {
    this.constant = constant.dbName;
    this.pk = key;
    this.pkHash = pkHash;
    this.origin = data;
    this.update = {};
    this.isInTranzaction = false;
    this.isUpdated = false;
    this.LazyCommiter = new LazyCommiter();
  }
  beInTranzaction(){
    this.isInTranzaction = true;
  }
  get key(){
    return this.pk;
  }
  set key(data = null){
    //なにもしない。
  }
  get data(){
  }
  set data(data = null){

  }
  get(propName){
    if(this.isInTranzaction && this.update[propName] !== undefined){
      return this.update[propName];
    }
    return this.origin===null? null :this.origin[propName];
  }
  set(propName,value){
    this.update[propName] = value;
    this.isUpdated = true;
  }
}
