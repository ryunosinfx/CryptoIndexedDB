import constant from '../constant'
import Authoricator from '../auth/authoricator'
const inMemoryDB = {};
export default class EntityManager {
  constructor(authoricator) {
    this.authoricator = authoricator;
  }
  async init(){
    for(let key in inMemoryDB){
      delete inMemoryDB[key];
    }
  }
  async fullLoad(){

  }
  async singleLoad(key){

  }
  async load(entity){

  }
  async save(entity){
    // inmemoryOnly
  }
  async delete(entity){
    // inmemoryOnly

  }
}
