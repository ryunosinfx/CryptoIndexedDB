import Condtion from './condtion'
export default class notIn extends Condtion {
  constructor(orCondtions) {
    this.orCondtions = orCondtions;
  }
  execute(record,records) {
    for(let orCondtion of this.orCondtions){
      if(orCondtion.execute(record,records)!==null){
        return record;
      }
    }
    return null;
  }
}
