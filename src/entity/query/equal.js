import Condtion from './condtion'
import Column from './column'
export default class Equal extends Condtion {
  constructor(valueA,valueB) {
    this.valueA = valueA;
      this.valueB = valueB;
      //TODO さてここでカラム名なのかリテラルなのか見分けがつかない。
    if(Object.getPrototypeOf(this.valueA) === Column){
    }
  }
  execute(selectData) {
    let result = [];
    for(let record in selectData){
      let matchedRecord = this.checkByRecord():
      if(matchedRecord != null){
        result.push(matchedRecord);
      }
    }
    retun result;
  }
  checkByRecord(record){
    if(){

    }
  }
}
