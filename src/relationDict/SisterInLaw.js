class SisterInLawRelation {

  _getSpouseSisters = (members, currentMember) => {
    return Object.values(members).filter(
      (member) => member.isFemale() && currentMember.spouse.isSiblingOf(member)
    );
  }

  _getBrothersWife = (members, currentMember) => {
    return Object.values(members).filter(member => {
      if(member.isFemale() && member.spouse){
        return currentMember.isSiblingOf(member.spouse);
      }
      return false;
    });
  }

  of(members, currentMember) {
    let sisterInLaws = [];
    if (currentMember.spouse) {
      const spouseSisters = this._getSpouseSisters(members, currentMember);
      sisterInLaws = [...spouseSisters];
    }
    const brothersWife = this._getBrothersWife(members, currentMember);
    return [...sisterInLaws, ...brothersWife];
  }
}

module.exports = new SisterInLawRelation();
