class MaternalAunt{
  of(members, currentMember){
    return Object.values(members).filter(member => {
      if(member.isFemale()){
        return currentMember.getParentBasedOnValidation((parent) => parent.isFemale()).isSiblingOf(member);
      }
      return false;
    })
  }

}

module.exports = MaternalAunt;