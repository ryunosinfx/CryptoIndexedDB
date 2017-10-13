
export default class where {
  constructor(condition) {
    this.condition = condition;
  }
  execute(selectData) {
    let retList = [];
    if(Array.isArray(selectData)){
      for(let record of selectData){
        if(this.filter(record)){
          retList.push(record);
        }
      }
    }
    retun retList;
  }
  filter(record){
    if(this.condition.execute(record)){
      return true;
    }
    return false;
  }

}
