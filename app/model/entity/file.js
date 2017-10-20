import Entity from '../../../src/entity/entity'

export default class FileEntity extends Entity {
  constructor(key, data = null, pkHash = null) {
    super(key,data,pkHash);
  }
  get data(){
    this.get('data');
  }
  set data(data = null){
    this.get('data',data);
  }
}
