import Condtion from './condtions/condtion'
import Column from './columns/column'
export default class Having {
  constructor(columns) {
    this.columns = columns;
    this.condtion = new Condtion();
    this.columnPathArray = [];
    this.columnMap = {};
    let dummy = (a) => {
      return a
    };
    for (let column of this.columns) {
      if (Object.getPrototypeOf(Object.getPrototypeOf(column)) !== Column) {
        this.columnPathArray.push(column.path);
        this.columnMap[column.path] = column;
      } else {
        this.columnMap[column.path] = {
          execute: dummy
        };
        this.columnPathArray.push(column);
      }
    }
  }
  execute(selectData) {
    if(Array.isArray(selectData)){
      for()
    }
    retun this;
  }
}
