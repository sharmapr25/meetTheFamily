const Family = require('./src/Family');
const Member = require("./src/Member");
const gender = require('./src/gender');

addSpouse = (person, spouse) => {
  person.addSpouse(spouse);
  spouse.addSpouse(person);
}

const createChitaChildrenTree = (family, chita, amba) => {
  const dritha = new Member("Dritha", gender.FEMALE, [chita, amba]);
  const tritha = new Member("Tritha", gender.FEMALE, [chita, amba]);
  const vritha = new Member("Vritha", gender.MALE, [chita, amba]);

  const jaya = new Member("Jaya", gender.MALE);
  addSpouse(jaya, dritha);

  const yodhan = new Member("Yodhan", gender.MALE, [jaya, dritha]);

  family.addMembers([dritha, tritha, vritha, jaya, yodhan]);
};

const createVichChildrenTree = (family, vich, lika) => {
  const vila = new Member("Vila", gender.FEMALE, [vich, lika]);
  const chilka = new Member("Chika", gender.FEMALE, [vich, lika]);
  family.addMembers([vila, chilka]);
};

createArasChildrenTree = (family, aras, chitra) => {
  const jinki = new Member("Jnki", gender.FEMALE, [aras, chitra]);
  const ahit = new Member("Ahit", gender.MALE, [aras, chitra]);

  const arit = new Member("Arit", gender.MALE);
  addSpouse(arit, jinki);

  const laki = new Member("Laki", gender.MALE, [arit, jinki]);
  const lavnya = new Member("Lavnya", gender.FEMALE, [arit, jinki]);

  family.addMembers([jinki, ahit, arit, laki, lavnya]);
}

createSatyaChildrenTree = (family, vyan, satya) => {
  const asva = new Member("Asva", gender.MALE,  [vyan, satya]);
  const atya = new Member("Atya", gender.FEMALE, [vyan, satya]);
  const vyas = new Member("Vyas", gender.MALE, [vyan, satya]);

  const satvy = new Member("Satvy", gender.FEMALE);
  addSpouse(asva, satvy);

  const krpi = new Member("Krpi", gender.FEMALE);
  addSpouse(vyas, krpi);

  const vasa = new Member("Vasa", gender.MALE, [asva, satvy]);
  const kriya = new Member("Kriya", gender.MALE, [vyas, krpi]);
  const krithi = new Member("Krithi", gender.FEMALE, [vyas, krpi]);

  family.addMembers([asva, atya, vyas, satvy, krpi, vasa, kriya, krithi]);
};

const setup = () => {
  const family = new Family();

  const kingShan = new Member("King Shan", gender.MALE);
  const queenAnga = new Member("Queen Anga", gender.FEMALE);
  addSpouse(kingShan, queenAnga);

  const chit = new Member("Chit", gender.MALE, [kingShan, queenAnga]);
  const amba = new Member("Amba", gender.FEMALE);
  addSpouse(chit, amba);

  const ish = new Member("Ish", gender.MALE, [kingShan, queenAnga]);

  const vich = new Member("Vich", gender.MALE, [kingShan, queenAnga]);
  const lika = new Member("Lika", gender.FEMALE);
  addSpouse(vich, lika);

  const aras = new Member("Aras", gender.MALE, [kingShan, queenAnga]);
  const chitra = new Member("Chitra", gender.FEMALE);
  addSpouse(aras, chitra);

  const satya = new Member("Satya", gender.FEMALE, [kingShan, queenAnga]);
  const vyan = new Member("Vyan", gender.MALE);
  addSpouse(satya, vyan);

    const membersToAdd = [
      kingShan,
      queenAnga,
      chit,
      amba,
      ish,
      vich,
      lika,
      aras,
      chitra,
      satya,
      vyan,
    ];

    family.addMembers(membersToAdd);

  createChitaChildrenTree(family, chit, amba);
  createVichChildrenTree(family, vich, lika);
  createArasChildrenTree(family, aras, chitra);
  createSatyaChildrenTree(family, vyan, satya);

  return family;
}

module.exports = setup;