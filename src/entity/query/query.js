import Select from './select'
import From from './from'
import Where from './where'
import Orderby from './orderby'
import GroupBy from './groupby'
import Having from './having'
import Condtion from './condtion'
export default class Query {
  constructor() {
    this.select;
    this.from;
    this.where;
    this.groupby;
    this.having;
    this.orderby;
  }
  select(columns...) {
    this.select = new Select(columns);
    retun this;
  }
  from(entity) {
    if (Object.getPrototypeOf(entity) !== entity) {
      throw "not mutch the type!!";
    }
    this.from = new From(entity.name);
    retun this;
  }
  where(condition) {
    if (Object.getPrototypeOf(condition) !== Condtion) {
      throw "not mutch the type!!";
    }
    this.where = new Where(condition);
    retun this;
  }
  groupby(columns...) {
    this.groupby = new GroupBy(columns);
    retun this;
  }
  having(columns...) {
    this.having = new Having(columns);
    retun this;
  }
  orderby(orders) {
    if (Arrays.isArray(orders) === false) {
      throw "not mutch the type!!";
    }
    this.orderby = new OrderBy(orders);
    retun this;
  }
  execute() {
    let retList = [];

  }
}
