import Condtion from './condtion'
export default class And extends Condtion {
  constructor(andCondtions) {
    this.andCondtions = andCondtions;
  }
  execute(record,records) {
    if(Array.isArray(selectData)){
      let isMatched = true;
      for(let andCondtion in this.andCondtions){
          if(andCondtion.execute(record,records)+==null){
            return null;
          }
      }
    }
    return record;
  }
}
