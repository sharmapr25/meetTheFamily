class SisterInLawRelation {
  _isBrotherWife(currentMember, member){
    return member.spouse && member.spouse.isSiblingOf(currentMember);
  }
  _isSpouseSister(currentMember, member){
    return currentMember.spouse && currentMember.spouse.isSiblingOf(member);
  }

  of(members, currentMember) {
    return Object.values(members).filter(member => {
      if(member.isFemale()){
        return this._isBrotherWife(currentMember, member) || this._isSpouseSister(currentMember, member);
      }
      return false;
    })
  }
}

module.exports = new SisterInLawRelation();
