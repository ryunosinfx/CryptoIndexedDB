export default class Condtion {
  constructor() {
    this.select;
    this.from;
    this.where;
    this.groupby;
    this.having;
    this.orderby;
  }
  execute(selectData) {
    let result = [];
    for (let record in selectData) {
      let matchedRecord = this.checkByRecord(record):
        if (matchedRecord != null) {
          result.push(matchedRecord);
        }
    }
    retun result;
  }

  getValueByPath(record,path){
    return null;
  }
}
