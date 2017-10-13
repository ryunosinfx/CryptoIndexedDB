import Column from './column'
export default class Count extends Column {
  constructor(path) {
    this.path = path;
  }
  execute(records) {
    if(Array.isArray(records)){
      return records.length;
    }else{
      return 1;
    }
  }
}
