import Select from './select'
import From from './from'
import Where from './where'
import Orderby from './orderby'
import GroupBy from './groupby'
import Having from './having'
import Condtion from './condtion'
export default class Query {
  constructor(isOnTranzaction,dbScanner) {
    this.select;
    this.from = null;
    this.where = null;
    this.groupby = null;
    this.having = null;
    this.orderby = null;
    this.isOnTranzactio= isOnTranzaction;
    this.dbScanner = dbScanner;
  }
  select(...columns) {
    this.select = new Select(columns);
    return this;
  }
  from(entity) {
    if (Object.getPrototypeOf(entity) !== entity) {
      throw "not mutch the type!!";
    }
    this.from = new From(entity.name,this.isOnTranzactio,this.dbScanner);
    return this;
  }
  where(condition) {
    if (Object.getPrototypeOf(condition) !== Condtion) {
      throw "not mutch the type!!";
    }
    this.where = new Where(condition);
    return this;
  }
  groupby(...columns) {
    this.groupby = new GroupBy(columns);
    return this;
  }
  having(...columns) {
    this.having = new Having(columns);
    return this;
  }
  orderby(orders) {
    if (Arrays.isArray(orders) === false) {
      throw "not mutch the type!!";
    }
    this.orderby = new OrderBy(orders);
    return this;
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
