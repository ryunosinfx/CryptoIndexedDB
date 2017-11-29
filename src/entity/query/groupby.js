import Condition from './conditions/condition'
import Column from './columns/column'
export default class GroupBy {
  constructor(columns) {
    this.columns = columns;
    this.condition = new Condition();
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
    let retMap = {
      gropuByed: "",
      preGroupByed: ""
    };
    let retRecoreds = [];
    let groupingMap = [];
    let preGroupByed = {};
    for (let record of selectData.gropuByed) {
      let retOne = {};
      let groupingKey = [];
      for (let columnPath of this.columnPathArray) {
        let a = self.condition.getValueByPath(record, order.path);
        let b = this.columnMap[columnPath].execute(a);
        retOne[columnPath] = b;
        groupingKey.push(columnPath);
        groupingKey.push(b);
      }
      let groupKey = groupingKey.join("/");
      let list = preGroupByed[preGroupByed];
      if (list === undefined) {
        list = [];
        preGroupByed[preGroupByed] = list;
      }
      list.push(record);
      groupingMap[groupKey] = retOne;
    }
    for (let key in groupingMap) {
      retRecoreds.push(groupingMap[key]);
    }
    retMap.gropuByed = retRecoreds;
    retMap.preGroupByed = preGroupByed;
    return retMap;
  }
}
