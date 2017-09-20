import constant from '../core/constant'
import EntityManager from './entityManager'
export default class TranzactionManager extends entityManager{
  constructor() {
    this.constant = constant.dbName;
  }
  begin(){

  }
  commit(){

  }
  rollback(){
    
  }
}
