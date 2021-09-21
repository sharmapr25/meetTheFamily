const Family = require('./src/Family');
const Member = require("./src/Member");
const gender = require('./src/gender');

addSpouse = (person, spouse) => {
  person.addSpouse(spouse);
  spouse.addSpouse(person);
}

const createChitaChildrenTree = (family, chita, amba) => {
  const dritha = new Member("Dritha", gender.F, [chita, amba]);
  const tritha = new Member("Tritha", gender.F, [chita, amba]);
  const vritha = new Member("Vritha", gender.M, [chita, amba]);

  const jaya = new Member("Jaya", gender.M);
  addSpouse(jaya, dritha);

  const yodhan = new Member("Yodhan", gender.M, [jaya, dritha]);

  family.addMembers([dritha, tritha, vritha, jaya, yodhan]);
};

const createVichChildrenTree = (family, vich, lika) => {
  const vila = new Member("Vila", gender.F, [vich, lika]);
  const chilka = new Member("Chika", gender.F, [vich, lika]);
  family.addMembers([vila, chilka]);
};

createArasChildrenTree = (family, aras, chitra) => {
  const jinki = new Member("Jnki", gender.F, [aras, chitra]);
  const ahit = new Member("Ahit", gender.M, [aras, chitra]);

  const arit = new Member("Arit", gender.M);
  addSpouse(arit, jinki);

  const laki = new Member("Laki", gender.M, [arit, jinki]);
  const lavnya = new Member("Lavnya", gender.F, [arit, jinki]);

  family.addMembers([jinki, ahit, arit, laki, lavnya]);
}

createSatyaChildrenTree = (family, vyan, satya) => {
  const asva = new Member("Asva", gender.M,  [vyan, satya]);
  const atya = new Member("Atya", gender.F, [vyan, satya]);
  const vyas = new Member("Vyas", gender.M, [vyan, satya]);

  const satvy = new Member("Satvy", gender.F);
  addSpouse(asva, satvy);

  const krpi = new Member("Krpi", gender.F);
  addSpouse(vyas, krpi);

  const vasa = new Member("Vasa", gender.M, [asva, satvy]);
  const kriya = new Member("Kriya", gender.M, [vyas, krpi]);
  const krithi = new Member("Krithi", gender.F, [vyas, krpi]);

  family.addMembers([asva, atya, vyas, satvy, krpi, vasa, kriya, krithi]);
};

const setup = () => {
  const family = new Family();

  const kingShan = new Member("King Shan", gender.M);
  const queenAnga = new Member("Queen Anga", gender.F);
  addSpouse(kingShan, queenAnga);

  const chit = new Member("Chit", gender.M, [kingShan, queenAnga]);
  const amba = new Member("Amba", gender.F);
  addSpouse(chit, amba);

  const ish = new Member("Ish", gender.M, [kingShan, queenAnga]);

  const vich = new Member("Vich", gender.M, [kingShan, queenAnga]);
  const lika = new Member("Lika", gender.F);
  addSpouse(vich, lika);

  const aras = new Member("Aras", gender.M, [kingShan, queenAnga]);
  const chitra = new Member("Chitra", gender.F);
  addSpouse(aras, chitra);

  const satya = new Member("Satya", gender.F, [kingShan, queenAnga]);
  const vyan = new Member("Vyan", gender.M);
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