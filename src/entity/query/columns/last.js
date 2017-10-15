import Column from './column'
export default class Sum extends Column {
  constructor(path) {
    super(path);
    this.path = path;
    this.value = null;
    this.isAggrigative = true;
  }
  execute(records) {
    if (Array.isArray(records)) {
      this.executePerRecord(records[records.length-1]);
    } else {
      this.executePerRecord(records);
    }
    return this.value;
  }
  executePerRecord(record) {
    this.value = this.getValueByPath(record, this.path);
  }
}
