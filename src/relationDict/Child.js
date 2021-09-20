class Child {
  constructor(childValidation) {
    this.childValidation = childValidation;
  }

  of(members, currentMember) {
    return Object.values(members).filter(
      (member) => this.childValidation(member) && member.isChildOf(currentMember)
    );
  }
}

module.exports = Child;