import Condtion from '../condtions/condtion'
export default class Column extends Condtion {
  constructor(path) {
    this.path = path;
    this.isAggrigative = false;
  }
  execute(record) {
    retun record;
  }
}
