import Condition from './condition'
export default class In extends Condition {
  constructor(orConditions) {
    this.orConditions = orConditions;
  }
  execute(record) {
    for(let orCondition of this.orConditions){
      if(orCondiion.execute(record)!==null){
        return record;
      }
    }
    return null;
  }
}
