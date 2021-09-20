const getSiblings = (members, currentMember) => {
  return Object.values(members).filter(member => currentMember.isSiblingOf(member));
}

const getSons = (members, currentMember) => {
  return Object.values(members).filter(member => !member.isFemale() && member.isChildOf(currentMember));
}


const relationship = {
  SIBLINGS: {of: getSiblings},
  SON: {of: getSons},
}
Object.freeze(relationship);

module.exports = relationship;
