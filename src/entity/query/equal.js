import Condtion from './condtion'
import Column from './column'
export default class Equal extends Condtion {
  constructor(valueA, valueB) {
    this.valueA = valueA;
    this.valueB = valueB;
    this.isColumnNameA =(Object.getPrototypeOf(this.valueA) === Column) ;
    this.isColumnNameB =(Object.getPrototypeOf(this.valueB) === Column) ;
  }
  checkByRecord(record) {
    if (this.isColumnNameA && this.isColumnNameB) {

    }
  }

  
}
