import Condtion from './condtion'
export default class And extends Condtion {
  constructor(andCondtions) {
    this.andCondtions = andCondtions;
  }
  execute(selectData) {
    if(Array.isArray(selectData)){
      for()
    }
    retun this;
  }
}
