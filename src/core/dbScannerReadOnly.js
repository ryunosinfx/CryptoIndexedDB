import DBScanner from './dbScanner'
export default class DBScannerReafOnly {
  constructor(authoricator) {
      this.DBScanner = new DBScanner();
  }
  select(entity){
    return this.DBScanner.select(entity);
  }
}
