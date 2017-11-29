import Condition from './condiion'
export default class And extends Condition {
  constructor(andConditions) {
    this.andConditions = andConditions;
  }
  execute(record, records) {
    if (Array.isArray(selectData)) {
      let isMatched = true;
      for (let andCondition in this.andConditions) {
        if (andCondition.execute(record, records) += =null) {
          return null;
        }
      }
    }
    return record;
  }
}
