const Child = require("./relationDict/Child");
const MaternalAunt = require("./relationDict/MaternalAunt");
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
  MATERNAL_AUNT: new MaternalAunt()
};
Object.freeze(relationship);

module.exports = relationship;
