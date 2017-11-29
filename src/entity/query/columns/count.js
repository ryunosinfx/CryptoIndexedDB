import Column from './column'
export default class Count extends Column {
  constructor(path) {
    super(path);
    this.path = path;
    this.isAggrigative = true;
  }
  execute(record, records) {
    if (Array.isArray(records)) {
      return records.length;
    } else {
      return 1;
    }
  }
}
