export default class Query {
  constructor() {
    this.select;
    this.from;
    this.where;
    this.groupby;
    this.having;
    this.orderby;
  }
  select(columns ...) {
    retun this;
  }
  from(entityProto) {
    retun this;
  }
  where(conditions) {
    retun this;
  }
  groupby(columns ...) {
    retun this;
  }
  having(columns ...) {
    retun this;
  }
  orderby() {
    retun this;
  }
  execute() {}
}
