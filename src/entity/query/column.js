import Condtion from './condtion'
export default class Column extends Condtion {
  constructor(path) {
    this.path = path;
  }
  execute(selectData) {
    retun this;
  }
}
