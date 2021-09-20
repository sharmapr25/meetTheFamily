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

  isFemale() {
    return this._gender === gender.F;
  }

  _hasParents() {
    return this._father && this._mother;
  }

  isSameMember(anotherMember) {
    return (
      this._name === anotherMember._name &&
      this._gender === anotherMember._gender
    );
  }

  isSiblingOf(anotherMember) {
    if (this.isSameMember(anotherMember)) {
      return false;
    }
    const doesBothHaveParent =
      this._hasParents() && anotherMember._hasParents();
    if (doesBothHaveParent) {
      return (
        this._father.isSameMember(anotherMember._father) &&
        this._mother.isSameMember(anotherMember._mother)
      );
    }
    return false;
  }

  isChildOf(parentMembertoCheck) {
    if (this._hasParents()) {
      return (
        this._father.isSameMember(parentMembertoCheck) ||
        this._mother.isSameMember(parentMembertoCheck)
      );
    }

    return false;
  }
}

module.exports = Member;