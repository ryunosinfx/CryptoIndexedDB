import Condition from '../conditions/condition'
export default class Column extends Condition {
  constructor(path) {
    this.path = path;
    this.isAggrigative = false;
  }
  execute(record) {
    return record;
  }
}
