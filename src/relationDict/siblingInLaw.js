class SiblingInLaw {
  constructor(inLawValidation){
    this._inLawValidation = inLawValidation;
  }

  _isSpouseSibling(currentMember, member){
    return currentMember.spouse && currentMember.spouse.isSiblingOf(member);
  }

  _isSiblingSpouse(currentMember, member){
    return member.spouse && member.spouse.isSiblingOf(currentMember);
  }

  of(members, currentMember) {
    return Object.values(members).filter((member) => {
      if (this._inLawValidation(member)) {
        return (
          this._isSpouseSibling(currentMember, member) ||
          this._isSiblingSpouse(currentMember, member)
        );
      }
      return false;
    });
  }
}

module.exports = SiblingInLaw;