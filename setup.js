const Family = require('./src/Family');
const Member = require("./src/Member");
const gender = require('./src/gender');

const kingShan = new Member('King Shan', gender.M)
const queenAnga = new Member('Queen Anga', gender.F);

const chit = new Member('Chit', gender.M, [kingShan, queenAnga]);

const amba = new Member("Amba", gender.F);

chit.addSpouse(amba);
amba.addSpouse(chit);

const dritha = new Member("Dritha", gender.F, [chit, amba]);

const setup = () => {
  const family = new Family();
  family.addMember(kingShan);
  family.addMember(queenAnga);
  family.addMember(chit);
  family.addMember(amba);
  family.addMember(dritha);
  return family;
}

module.exports = setup;