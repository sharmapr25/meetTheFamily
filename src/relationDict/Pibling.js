class Pibling{
  constructor(genderValidation, parentRelationValidation){
    this._genderValidation = genderValidation;
    this._parentRelationValidation = parentRelationValidation;
  }

  of(members, currentMember){
     return Object.values(members).filter((member) => {
       if (this._genderValidation(member)) {
         return currentMember
           .getParentBasedOnValidation(this._parentRelationValidation)
           .isSiblingOf(member);
       }
       return false;
     });
  }

}

module.exports = Pibling;