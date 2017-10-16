import Column from './column'
//import Column from '../../../core/crypt/column'
export default class Min extends Column {
  constructor(path) {
    super(path);
    this.path = path;
    this.min = 0;
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
    return this.min;
  }
  executePerRecord(record) {
    let plane = this.getValueByPath(record, this.path);

    this.min = this.min === 0 || this.min > plane
      ? plane
      : this.min ;
  }
}
