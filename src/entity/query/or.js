import Condtion from './condtion'
export default class Or extends Condtion {
  constructor(orCondtions) {
    this.orCondtions = orCondtions;
  }
  select(columns ...) {

    retun this;
  }
}
