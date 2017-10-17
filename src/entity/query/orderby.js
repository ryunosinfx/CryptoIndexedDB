import Condtion from './condtions/condtion'
export default class OrderBy {
  constructor(orders) {
    this.orders = orders;
    this.condtion = new Condtion();
  }
  execute(selectData) {
    let resultMap = {
      gropuByed: selectData.gropuByed,
      preGroupByed: selectData.preGroupByed,
      sorted: [],
      sortedMap: {}
    };
    let sortData = [];
    for (let groupByKey in selectData.gropuByed) {
      let record = resultMap.gropuByed[groupByKey];
      sortData.push(record);
      sortedMap[record] =groupByKey;
    }
    let orders = ([].concat(this.orders)).reverse();
    for (let order of orders) {
      if (order.isDESC) {
        this.toBeDESC(sortData, order);
      } else {
        this.toBeASC(sortData, order);
      }
    }
    resultMap.sorted = sortData;
    resultMap.sortedMap = sortedMap;
    return resultMap;
  }
  toBeASC(list, order) {
    let self = this;
    list.sort(function(recordA, recordB) {
      let a = self.condtion.getValueByPath(recordA, order.path);
      let b = self.condtion.getValueByPath(recordB, order.path);
      if (a < b)
        return -1;
      if (a > b)
        return 1;
      return 0;
    });
  }
  toBeDESC(list, order) {
    let self = this;
    list.sort(function(recordA, recordB) {
      let a = self.condtion.getValueByPath(recordA, order.path);
      let b = self.condtion.getValueByPath(recordB, order.path);
      if (a > b)
        return -1;
      if (a < b)
        return 1;
      return 0;
    });
  });
}
}
