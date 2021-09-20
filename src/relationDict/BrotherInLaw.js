class BrotherInLaw{
  _isSpouseBrother(currentMember, member){
    return currentMember.spouse && !member.isFemale() && currentMember.spouse.isSiblingOf(member);
  }

  _isSisterHusband(currentMember, member){
    return !member.isFemale() && member.spouse && member.spouse.isSiblingOf(currentMember);

  }
  of(members, currentMember){
    return Object.values(members).filter(member => {
      if(!member.isFemale()){
        return this._isSpouseBrother(currentMember, member) || this._isSisterHusband( currentMember, member);
      }
      return false;
    })
  }
}

module.exports = new BrotherInLaw();