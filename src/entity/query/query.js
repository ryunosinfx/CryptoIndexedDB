import Select from './select'
import From from './from'
import Where from './where'
import Orderby from './orderby'
import GroupBy from './groupby'
import Having from './having'
import Condtion from './condtion'
export default class Query {
  constructor(isOnTranzaction) {
    this.select;
    this.from = null;
    this.where = null;
    this.groupby = null;
    this.having = null;
    this.orderby = null;
    this.isOnTranzactio= isOnTranzaction;
  }
  select(columns...) {
    this.select = new Select(columns);
    retun this;
  }
  from(entity) {
    if (Object.getPrototypeOf(entity) !== entity) {
      throw "not mutch the type!!";
    }
    this.from = new From(entity.name,this.isOnTranzactio);
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
    let fromData = this.from .execute();
    if(this.where){
      fromData = this.where(fromData);
    }
    if(this.groupby){
      fromData = this.groupby(fromData);
    }
    if(this.having){
      fromData = this.having(fromData);
    }
    if(this.orderby){
      fromData = this.orderby(fromData);
    }

    return retList;
  }
}
