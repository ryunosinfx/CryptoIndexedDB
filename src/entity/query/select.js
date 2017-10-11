
export default class select {
  constructor(columns) {
    this.columns = columns;
    this.isDistinct = false;
  }
  distinctK(){
    this.isDdstinct = true;
    return this;
  }
  execute(selectData) {
    if(Array.isArray(selectData)){
      for()
    }
    retun this;
  }
}
