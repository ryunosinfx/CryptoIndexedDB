import Column from './columns/column'
export default class select {
  constructor(columns) {
    this.columns = columns;
    this.isDistinct = false;
  }
  distinctK() {
    this.isDdstinct = true;
    return this;
  }
  execute(selectData) {
    let retList = [];
    if (selectData.sorted) {
      if (!!this.columns === false || this.columns === "*") {
        for (let record of selectData.sorted) {
          let groupByKey = selectData.sortedMap[record];
          let records = selectData.preGroupByed[groupByKey];
          retList.push(this.executeByRecord(record, records));
        }
      } else {
        retList = selectData.sorted;
      }
    } else {
      for (let groupByKey in selectData.gropuByed) {
        let record = selectData.gropuByed[groupByKey];
        let records = selectData.preGroupByed[groupByKey];
        retList.push(this.executeByRecord(record, records));
      }
    }
    return retList;
  }
  executeByRecord(record, records)) {
    let retOne = {};
    for (let column of this.columns) {
      retOne[column.path] = column.execute(record, records);
    }
    return retOne;
  }
}
