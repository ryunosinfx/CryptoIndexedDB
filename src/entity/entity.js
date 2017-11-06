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
  set createTime(createTime){
    super.set("createTime",createTime);
  }
  get createTime(){
    return super.get("createTime");
  }
  set updateTime(updateTime){
    super.set("updateTime",updateTime);
  }
  get updateTime(){
    return super.get("updateTime");
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
    this.updateTimm = Date.getTime();
  }
  // XQLを考えると、Queryが存在して、from,Where(and,or,in,between,exists),groupby,having,orderby,がある。
  getAsContions(){
    let contions = {};
    for(let propName in this.update){
      let propValue = this.update[propName];
      if(propValue !== undefined) {
        contions[propName] = propValue;
      }
    }
    return contions;
  }
}
