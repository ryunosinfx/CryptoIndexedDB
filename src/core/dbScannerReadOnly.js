import DBScanner from './dbScanner'
export default class DBScannerReafOnly {
  constructor(dbScanner) {
      this.dbScanner = dbScanner;
  }
  selecｔByName(entityName){
    return this.dbScanner.select(entity);
  }
  select(entity){
    return this.dbScanner.select(entity);
  }
}
