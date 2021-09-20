class SonRelation {
  of(members, currentMember) {
   return Object.values(members).filter(
     (member) => !member.isFemale() && member.isChildOf(currentMember)
   );
  }
}

module.exports = new SonRelation();
