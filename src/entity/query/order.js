export default class Order {
  constructor(path,derection) {
    this.path = path;
    this.isDESC = derection==="DESC";
  }
}
