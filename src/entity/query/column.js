import Condtion from './condtion'
export default class Column extends Condtion {
  constructor(columnName) {
    this.columnName = columnName;
  }
  execute(selectData) {
    retun this;
  }
}
