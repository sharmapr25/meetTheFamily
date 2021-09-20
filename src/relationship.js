const brotherInLaw = require("./relationDict/BrotherInLaw");
const daughter = require("./relationDict/Daughter");
const siblings = require("./relationDict/Siblings");
const sisterInLaw = require("./relationDict/SisterInLaw");
const son = require("./relationDict/Son");

const relationship = {
  SIBLINGS: siblings,
  SON: son,
  DAUGHTER: daughter,
  SISTER_IN_LAW: sisterInLaw,
  BROTHER_IN_LAW: brotherInLaw
};
Object.freeze(relationship);

module.exports = relationship;
