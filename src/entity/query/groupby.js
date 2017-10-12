import Condtion from './condtions/condtion'
import Column from './column'
export default class GroupBy {
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
    let retRecoreds = [];
    let groupingMap = [];
    if (Array.isArray(selectData)) {
      for (let record of selectData) {
        let retOne = {};
        let groupingKey = [];
        for (let columnPath of this.columnPathArray) {
          let a = self.condtion.getValueByPath(recordA, order.path);
          let b = this.columnMap[columnPath].execute(a);
          retOne[columnPath] = b;
          groupingKey.push(columnPath);
          groupingKey.push(b);
        }
        groupingMap[groupingKey.join("/")] = retOne;
      }
      for (let key in groupingMap) {
        retRecoreds.pus(groupingMap[key]);
      }
    }
    retun retRecoreds;
  }
}
