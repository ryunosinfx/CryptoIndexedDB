import Condition from './condition'
export default class Or extends Condition {
  constructor(orConditions) {
    this.orConditions = orConditions;
  }
  execute(record, records) {
    for (let orCondition of this.orConditions) {
      if (orCondition.execute(record, records) !== null) {
        return record;
      }
    }
    return null;
  }
}
