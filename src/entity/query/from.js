import DBScannerReafOnly from '../../core/dbScannerReafOnly'
export default class from {
  constructor(entityName) {
    this.entityName = entityName;
    this.dbScannerReafOnly = new DBScannerReafOnly();
  }
  execute() {
    return this.dbScannerReafOnly.selecｔByName(this.entityName);
  }
}
