import DBScanner from './dbScanner'
export default class DBScannerReafOnly {
  constructor() {
      this.dbScanner = new DBScanner();
  }
  selecｔByName(entityName){
    return this.dbScanner.select(entity);
  }
  select(entity){
    return this.dbScanner.select(entity);
  }
}
