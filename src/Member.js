const gender = require("./gender");

class Member {
  constructor(name, gender, parents = []) {
    this._name = name;
    this._gender = gender;
    this._spouse = null;
    parents.length > 0 && ([this._father, this._mother] = parents);
  }

  get name() {
    return this._name;
  }

  get spouse() {
    return this._spouse;
  }

  addSpouse(spouse) {
    this._spouse = spouse;
  }

  isFemale(){
    return this._gender === gender.F;
  }
}

module.exports = Member;