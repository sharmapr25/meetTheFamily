class Siblings {
  of(members, currentMember){
    return Object.values(members).filter((member) => currentMember.isSiblingOf(member));
  }
}

const relationship = {SIBLINGS: new Siblings()}
Object.freeze(relationship);

module.exports = relationship;
