import Column from './column'
export default class First extends Column {
  constructor(path) {
    super(path);
    this.path = path;
    this.value = null;
    this.isAggrigative = true;
  }
  execute(records) {
    if (Array.isArray(records)) {
      for (let record of records) {
        this.executePerRecord(record);
        return this.value;
      }
    } else {
      this.executePerRecord(records);
    }
    return this.value
  }
  executePerRecord(record) {
    this.value = this.getValueByPath(record, this.path);
  }
}
