import Condtion from './condtion'
export default class Or extends Condtion {
  constructor(orCondtions) {
    this.orCondtions = orCondtions;
  }
  execute(record) {
    for(let orCondtion of this.orCondtions){
      if(orCondtion.execute(record)!==null){
        return record;
      }
    }
    return null;
  }
}
