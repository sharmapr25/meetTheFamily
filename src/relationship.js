const Child = require("./relationDict/Child");
const Pibling = require("./relationDict/Pibling");
const SiblingInLaw = require("./relationDict/SiblingInLaw");
const siblings = require("./relationDict/Siblings");

const femaleValidation = (member) => member.isFemale();
const maleValidation = (member) => !member.isFemale();

const relationship = {
  SIBLINGS: siblings,
  SON: new Child(maleValidation),
  DAUGHTER: new Child(femaleValidation),
  SISTER_IN_LAW: new SiblingInLaw(femaleValidation),
  BROTHER_IN_LAW: new SiblingInLaw(maleValidation),
  MATERNAL_AUNT: new Pibling(femaleValidation, femaleValidation),
  PATERNAL_AUNT: new Pibling(femaleValidation, maleValidation),
  PATERNAL_UNCLE: new Pibling(maleValidation, maleValidation),
  MATERNAL_UNCLE: new Pibling(maleValidation, femaleValidation)
};

Object.freeze(relationship);

module.exports = relationship;
