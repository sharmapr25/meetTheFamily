class Pibling{
  constructor(genderValidation, parentRelationValidation){
    this.genderValidation = genderValidation;
    this.parentRelationValidation = parentRelationValidation;
  }

  of(members, currentMember){
     return Object.values(members).filter((member) => {
       if (this.genderValidation(member)) {
         return currentMember
           .getParentBasedOnValidation(this.parentRelationValidation)
           .isSiblingOf(member);
       }
       return false;
     });
  }

}

module.exports = Pibling;