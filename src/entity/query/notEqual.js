import Condtion from './condtion'
import Column from './column'
export default class NotEqual extends Condtion {
  constructor(valueA, valueB, isFullMatch) {
    this.isFullMatch = isFullMatch;
    this.valueA = valueA;
    this.valueB = valueB;
    this.isColumnNameA =(Object.getPrototypeOf(this.valueA) === Column) ;
    this.isColumnNameB =(Object.getPrototypeOf(this.valueB) === Column) ;
  }
  checkByRecord(record) {
    let valueRealsA = this.getValueByPath(record,this.valueA,this.isColumnNameA);
    let valueRealsB = this.getValueByPath(record,this.valueB,this.isColumnNameB);
    let valueCount = valueRealsA.length;
    let isEqual = false;
    for(let valueRealA of valueRealsA){
      for(let valueRealB of valueRealsB){
        if(valueRealA===valueRealB){
          isEqual = true;
          break;
        }
      }
      if(isEqual){break;}
    }
    return isEqual?null:record;
  }
}
