import Column from './column'
export default class First extends Column {
  constructor(path,nth) {
    super(path);
    this.path = path;
    this.nth = nth;
    this.value = null;
    this.isAggrigative = true;
  }
  execute(records) {
    if (Array.isArray(records) && records.length >0) {
        this.executePerRecord(records[records.length >=this.nth-1?this.nth:records.length -1]);
        return this.value;
    } else {
      this.executePerRecord(records);
    }
    return this.value
  }
  executePerRecord(record) {
    this.value = this.getValueByPath(record, this.path);
  }
}
