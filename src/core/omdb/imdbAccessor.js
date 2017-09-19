import constant from '../constant'
import Authoricator from '../auth/authoricator'
const inMemoryDB = {};
export default class EntityManager {
  constructor(userId,passwd) {
    this.constant = constant.dbName;
  }
  async login(){

  }
  async logout(){

  }
  async load(entity){

  }
  async save(entity){
    //
  }
  async delete(entity){

  }
}
