import DBScannerReafOnly from '../../core/dbScannerReafOnly'
export default class from {
  constructor(entityName, isOnTranzaction) {
    this.entityName = entityName;
    this.isOnTranzaction = isOnTranzaction;
    this.dbScannerReafOnly = new DBScannerReafOnly();
  }
  execute() {
    let resultMap = {
      gropuByed: {},
      preGroupByed: {}
    };
    let selectData = this.dbScannerReafOnly.selecｔByName(this.entityName);
    for (let record of selectData) {
      record.isInTranzaction = this.isOnTranzactio;
      resultMap.gropuByed[record.pk] = record;
      resultMap.preGroupByed[record.pk] = [record];
    }
    return resultMap;
  }
}
