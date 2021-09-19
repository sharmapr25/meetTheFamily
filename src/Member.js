class Member {
  constructor(name, gender, parents = []) {
    this._name = name;
    this._gender = gender;
    this._spouse = null;
    parents.length > 0 && ([this._father, this._mother] = parents);
  }

  addSpouse(spouse) {
    this._spouse = spouse;
  }

  get name() {
    return this._name;
  }

  get spouse() {
    return this._spouse;
  }
}

module.exports = Member;