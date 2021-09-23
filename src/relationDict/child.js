class Child {
  constructor(childValidation) {
    this._childValidation = childValidation;
  }

  of(members, currentMember) {
    return Object.values(members).filter(
      (member) => this._childValidation(member) && member.isChildOf(currentMember)
    );
  }
}

module.exports = Child;