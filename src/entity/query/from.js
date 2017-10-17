import DBScannerReafOnly from '../../core/dbScannerReafOnly'
export default class from {
  constructor(entityName) {
    this.entityName = entityName;
    this.dbScannerReafOnly = new DBScannerReafOnly();
  }
  execute() {
    let resultMap = {
      gropuByed: {},
      preGroupByed: {}
    };
    let selectData = this.dbScannerReafOnly.selecｔByName(this.entityName);
    for (let record of selectData) {
      resultMap.gropuByed[record.pk] = record;
      resultMap.preGroupByed[record.pk] = [record];
    }
    return resultMap;
  }
}
