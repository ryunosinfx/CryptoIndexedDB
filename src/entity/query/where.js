export default class where {
  constructor(condition) {
    this.condition = condition;
  }
  execute(selectData) {
    let resultMap = {
      gropuByed: {},
      preGroupByed: {}
    };
    for (let pk in selectData.gropuByed) {
      let record = resultMap.gropuByed[record.pk];
      let records = resultMap.preGroupByed[record.pk];
      if (this.condition.execute(record, records) {
        resultMap.gropuByed[record.pk] = record;
        resultMap.preGroupByed[record.pk] = [record];
      }
    }
    return resultMap;
  }
}
