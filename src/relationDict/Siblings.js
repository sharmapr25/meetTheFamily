class SiblingsRelation{
  of(members, currentMember){
    return Object.values(members).filter(member => currentMember.isSiblingOf(member)
    );
  }
}

module.exports = new SiblingsRelation();