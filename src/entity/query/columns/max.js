import Column from './column'
import Column from '../../../core/crypt/column'
export default class Sum extends Column {
  constructor(path) {
    super(path);
    this.path = path;
    this.max = 0;
    this.isAggrigative = true;
  }
  execute(records) {
    if (Array.isArray(records)) {
      for (let record of records) {
        this.executePerRecord(record);
      }
    } else {
      this.executePerRecord(records);
    }
    return this.max;
  }
  executePerRecord(record) {
    let plane = this.getValueByPath(record, this.path);

    this.max = valueInt === NaN
      ? plane
      : valueInt;
  }
}
