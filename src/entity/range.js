export default class Range {
  constructor(graterEqual = null,lesserEqual = null,grater = null,lesser = null) {
    this.graterEqual = graterEqual;
    this.lesserEqual = lesserEqual;
    this.grater = grater;
    this.lesser = lesser;
  }
  grater(){
    return this.grater;
  }
  lesser(){
    return this.lesser;
  }
  graterEqual(){
    return this.graterEqual;
  }
  lesserEqual(){
    return this.lesserEqual;
  }
}
