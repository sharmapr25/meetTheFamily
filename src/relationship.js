const gender = require("./gender");

const getSiblings = (members, currentMember) => {
  return Object.values(members).filter(member => currentMember.isSiblingOf(member));
  };

const getSons = (members, currentMember) => {
  return Object.values(members).filter(member => !member.isFemale() && member.isChildOf(currentMember));
}

const getDaughters = (members, currentMember) => {
  return Object.values(members).filter(member => member.isFemale() && member.isChildOf(currentMember));
}

const _getSpouseSisters = (members, currentMember) => {
  return Object.values(members).filter(
    (member) => member.isFemale() && currentMember.spouse.isSiblingOf(member)
  );
}

const _getBrothersWife = (members, currentMember) => {
  return Object.values(members).filter(member => {
    if(member.isFemale() && member.spouse){
      return getSiblings(members, member.spouse).includes(currentMember);
    }
    return false;
  });
}

const getSisterInLaws = (members, currentMember) => {
  let sisterInLaws = [];
  if(currentMember.spouse){
    const spouseSisters = _getSpouseSisters(members, currentMember);
    sisterInLaws = [...spouseSisters];
  }
  const brothersWife = _getBrothersWife(members, currentMember);
  return [...sisterInLaws, ...brothersWife];
}


const relationship = {
  SIBLINGS: { of: getSiblings },
  SON: { of: getSons },
  DAUGHTER: { of: getDaughters },
  SISTER_IN_LAW: {of: getSisterInLaws}
};
Object.freeze(relationship);

module.exports = relationship;
