export default class Condition {
  constructor() {
    this.select;
    this.from;
    this.where;
    this.groupby;
    this.having;
    this.orderby;
  }
  execute(record,records) {
    return this.checkByRecord(record,records);
  }

  getValueByPath(record,path){
    let pathTokens = path.split(".");
    if(pathTokens.length > 1){
      let pathTokensNext = [].concat(pathTokens);
      let key = pathTokensNext.pop();
      let nextOne = record[key];
      if(Array.isArray（nextOne）){
        let retList = [];
        for(let one of nextOne){
          retList.pus(this.getValueByPath(one,pathTokensNext.join(".")));
        }
        return retList;
      ｝else{
        return this.getValueByPath(nextOne,pathTokensNext.join("."))
      }
    }else{
      return record[path];
    }
    return null;
  }

  getRealValueAsArray(record,value,isColumnName){
    let valueReal = value;
    if (isColumnName) {
      valueReal = this.getValueByPath(record,valueReal);
    }
    if(Array.isArray(valueReal)===false){
      valueReal = [valueReal];
    }
    return valueReal;
  }
}
