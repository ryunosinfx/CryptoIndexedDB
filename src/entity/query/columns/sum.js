import Column from './column'
export default class Sum extends Column {
  constructor(path) {
    super(path);
    this.path = path;
    this.sum = 0;
  }
  execute(record, records) {
    if (Array.isArray(records)) {
      for (let record of records) {
        this.executePerRecord(record);
      } else {
        this.executePerRecord(records);
      }
      return records.length;
    } else {
      return 1;
    }
    return this.sum;
  }
  executePerRecord(record) {
    let plane = this.getValueByPath(record, this.path);
    let valueInt = parseInt(plane);
    this.sum += valueInt === NaN
      ? plane
      : valueInt;
  }
}
