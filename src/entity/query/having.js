import Condtion from './condtions/condtion'
import Column from './columns/column'
export default class Having {
  constructor(condtion) {
    this.condtion = condtion;
    this.condtion = new Condtion();
    this.columnPathArray = [];
    this.columnMap = {};
    let dummy = (a) => {
      return a
    };
  }
  execute(groupByedData) {
    let gropuByed = groupByedData.gropuByed;
    let preGroupByed = groupByedData.preGroupByed;
    let resultList = [];
    for(let groupByKey in gropuByed){
      let record =gropuByed[groupByKey];
      let records = preGroupByed[groupByKey];
      for(let path of this.columnMap){
        if(this.condition.execute(record,records)){
          return true;
        }
        return false;
      }
    }
    retun resultList;
  }
}
