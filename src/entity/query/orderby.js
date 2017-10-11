import Condtion from './condtion'
export default class OrderBy {
  constructor(orders) {
    this.orders = orders;
    this.condtion = new Condtion();
  }
  execute(selectData) {
    let orders = ([].concat(this.orders)).reverse();
    for (let order of orders) {
      if (order.isDESC) {
        this.toBeDESC(selectData, order);
      } else {
        this.toBeASC(selectData, order);
      }
    }
    retun selectData;
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
