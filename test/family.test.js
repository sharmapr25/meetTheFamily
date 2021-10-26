const assert = require("assert");
const {MemberNotFoundError, ChildAdditionFailedError} = require('../src/error/index');
const Family = require('../src/family');
const gender = require("../src/gender");
const Member = require("../src/member");
const relationship = require('../src/relationship');

const createFamilyTree = members => {
  const family = new Family();
  family.addMembers(members);
  return family;
}

describe('addChild', () => {
  it("should add Chitra as Aria's child when aria is already member of family tree", () => {
    const aria = new Member('Aria', gender.FEMALE);
    const asva = new Member("Asva", gender.MALE);
    aria.addSpouse(asva);
    asva.addSpouse(aria);
    const family = createFamilyTree([aria, asva]);

    family.addChild('Aria', 'Chitra', gender.FEMALE);

    const expectedResult = new Member('Chitra', gender.FEMALE, [asva, aria]);

    assert.deepEqual(family.getMember('Chitra'), expectedResult);
  });

  it("should throw member not found error when add Chitra as aria's child where aria doesn't exist in family tree", () => {
    const family = new Family();

    assert.throws(() => family.addChild("Aria", "Chitra", gender.FEMALE),MemberNotFoundError);
  });

   it("should throw child addition failed error when try to add chitra as a child of asva who is a male", () => {
     const aria = new Member("Aria", gender.FEMALE);
     const asva = new Member("Asva", gender.MALE);
     aria.addSpouse(asva);
     asva.addSpouse(aria);
     const family = createFamilyTree([aria, asva]);

     assert.throws(() => family.addChild("Asva", "Chitra", gender.FEMALE),
       ChildAdditionFailedError
     );
   });

   it("should throw child addition failed error when try to add chitra as a child of aria who doesn't have any spouse", () => {
     const aria = new Member("Aria", gender.FEMALE);
     const family = createFamilyTree([aria]);
     assert.throws(() => family.addChild("Aria", "Chitra", gender.FEMALE),
       ChildAdditionFailedError
     );
   });
});

describe('getRelationship', () => {
  it('should return asva when ask for atya siblings', () => {
    const kingShan = new Member("King Shan", gender.MALE);
    const queenAnga = new Member("Queen Anga", gender.FEMALE);
    const atya = new Member("Atya", gender.FEMALE, [kingShan, queenAnga]);
    const asva = new Member("Asva", gender.MALE, [kingShan, queenAnga]);
    const family = createFamilyTree([kingShan, queenAnga, atya, asva]);

    const atyaSiblings = family.getRelationship(atya, relationship.SIBLINGS);

    assert.deepEqual(atyaSiblings, [asva]);
  });

  it("should return asva and aria when satya has those two siblings", () => {
    const kingShan = new Member("King Shan", gender.MALE);
    const queenAnga = new Member("Queen Anga", gender.FEMALE);
    const atya = new Member("Atya", gender.FEMALE, [kingShan, queenAnga]);
    const asva = new Member("Asva", gender.MALE, [kingShan, queenAnga]);
    const satya = new Member("Satya", gender.FEMALE, [kingShan, queenAnga]);
    const family = createFamilyTree([kingShan, queenAnga, atya, asva, satya]);

    const satyaSiblings = family.getRelationship(satya, relationship.SIBLINGS);

    assert.deepEqual(satyaSiblings, [atya, asva]);
  });

  it("should return asva when ask for king shan's son", () => {
    const kingShan = new Member("King Shan", gender.MALE);
    const queenAnga = new Member("Queen Anga", gender.FEMALE);
    kingShan.addSpouse(queenAnga);
    queenAnga.addSpouse(kingShan);
    const asva = new Member("Asva", gender.MALE, [kingShan, queenAnga]);
    const family = createFamilyTree([kingShan, queenAnga, asva]);

    const kingShanSon = family.getRelationship(kingShan, relationship.SON);

    assert.deepEqual(kingShanSon, [asva]);
  });

  it("should return chit and vich when ask for king shan sons and king shan has three children", () => {
    const kingShan = new Member("King Shan", gender.MALE);
    const queenAnga = new Member("Queen Anga", gender.FEMALE);
    kingShan.addSpouse(queenAnga);
    queenAnga.addSpouse(kingShan);
    const chit = new Member("Chit", gender.MALE, [kingShan, queenAnga]);
    const vich = new Member("Vich", gender.MALE, [kingShan, queenAnga]);
    const satya = new Member("Satya", gender.FEMALE, [kingShan, queenAnga]);
    const family = createFamilyTree([kingShan, queenAnga, chit, vich, satya]);

    const kingShanSons = family.getRelationship(kingShan, relationship.SON);

    assert.deepEqual(kingShanSons, [chit, vich]);
  });

  it("should return empty list when asva does not have any daughter", () => {
    const family = new Family();
    const asva = new Member("Asva", gender.MALE);
    family.addMembers([asva]);

    const asvaDaughters = family.getRelationship(asva, relationship.DAUGHTER);

    assert.deepEqual(asvaDaughters, []);
  });

  it("should return satya when ask for king shan daugthers and king shan has three children", () => {
    const kingShan = new Member("King Shan", gender.MALE);
    const queenAnga = new Member("Queen Anga", gender.FEMALE);

    const chit = new Member("Chit", gender.MALE, [kingShan, queenAnga]);
    const vich = new Member("Vich", gender.MALE, [kingShan, queenAnga]);
    const satya = new Member("Satya", gender.FEMALE, [kingShan, queenAnga]);

    const family = createFamilyTree([kingShan, queenAnga, chit, vich, satya]);

    const kingShanDaughters = family.getRelationship(kingShan, relationship.DAUGHTER);
    assert.deepEqual(kingShanDaughters, [satya]);
  });

  it("should return satvy and krpi as atya sister-in-law when both are spouse of atys's brothers", () => {
    const kingShan = new Member("King Shan", gender.MALE);
    const queenAnga = new Member("Queen Anga", gender.FEMALE);

    const asva = new Member("Asva", gender.MALE, [kingShan, queenAnga]);
    const vyas = new Member("Vyas", gender.MALE, [kingShan, queenAnga]);
    const atya = new Member("Atya", gender.FEMALE, [kingShan, queenAnga]);
    const satvy = new Member("Satvy", gender.FEMALE);
    const krpi = new Member("Krpi", gender.FEMALE);

    asva.addSpouse(satvy);
    satvy.addSpouse(asva);
    vyas.addSpouse(krpi);
    krpi.addSpouse(vyas);

    const family = createFamilyTree([kingShan, queenAnga, asva, atya, satvy, vyas, krpi]);

    const atyaSisterInLaws = family.getRelationship(atya, relationship.SISTER_IN_LAW);

    assert.deepEqual(atyaSisterInLaws, [satvy, krpi]);
  });

  it("should return satya and krpi as atya sister-in-law when satya is spouse of atya brother and krpi is sister of her spouse", () => {
    const kingShan = new Member("King Shan", gender.MALE);
    const queenAnga = new Member("Queen Anga", gender.FEMALE);
    const chit = new Member("Chit", gender.MALE);
    const amba = new Member("amba", gender.FEMALE);
    const asva = new Member("Asva", gender.MALE, [kingShan, queenAnga]);
    const atya = new Member("Atya", gender.FEMALE, [kingShan, queenAnga]);
    const satya = new Member("Satya", gender.FEMALE);

    asva.addSpouse(satya);
    satya.addSpouse(asva);

    const vyas = new Member("Vyas", gender.MALE, [chit, amba]);
    const krpi = new Member("Krpi", gender.FEMALE, [chit, amba]);

    vyas.addSpouse(atya);
    atya.addSpouse(vyas);

    const family = createFamilyTree([kingShan, queenAnga, asva, atya, satya, vyas, krpi]);

    const atyaSisterInLaws = family.getRelationship(
      atya,
      relationship.SISTER_IN_LAW
    );

    assert.deepEqual(atyaSisterInLaws, [satya, krpi]);
  });

  it("should return asva as asva is brother of krpi husband", () => {
    const kingShan = new Member("King Shan", gender.MALE);
    const queenAnga = new Member("Queen Anga", gender.FEMALE);
    const asva = new Member("Asva", gender.MALE, [kingShan, queenAnga]);
    const vyas = new Member("Vyas", gender.MALE, [kingShan, queenAnga]);
    const krpi = new Member("Krpi", gender.FEMALE);

    vyas.addSpouse(krpi);
    krpi.addSpouse(vyas);

    const family = createFamilyTree([kingShan, queenAnga, asva, vyas, krpi]);

    const krpiBrotherInLaws = family.getRelationship(krpi, relationship.BROTHER_IN_LAW);

    assert.deepEqual(krpiBrotherInLaws, [asva]);
  });

  it("should return tritha as maternal-aunt for yodhan as she is sister of his mother dritha",
  () => {
    const chit = new Member("Chit", gender.MALE);
    const amba = new Member("Amba", gender.FEMALE);
    const dritha = new Member("Dritha", gender.FEMALE, [chit, amba]);
    const tritha = new Member("Tritha", gender.FEMALE, [chit, amba]);
    const jaya = new Member("Jaya", gender.MALE);
    const yodhan = new Member("Yodhan", gender.MALE, [jaya, dritha]);

    jaya.addSpouse(dritha);
    dritha.addSpouse(jaya);

    const family = createFamilyTree([chit, amba, dritha, tritha, jaya, yodhan]);

    const yodhanMaternalAunties = family.getRelationship(yodhan, relationship.MATERNAL_AUNT);

    assert.deepEqual(yodhanMaternalAunties, [tritha]);
  })

  it("should return tritha as paternal-aunt for yodhan as she is sister of his father jaya", () => {
    const chit = new Member("Chit", gender.MALE);
    const amba = new Member("Amba", gender.FEMALE);
    const tritha = new Member("Tritha", gender.FEMALE, [chit, amba]);
    const jaya = new Member("Jaya", gender.MALE, [chit, amba]);
    const dritha = new Member("Dritha", gender.FEMALE);
    const yodhan = new Member("Yodhan", gender.MALE, [jaya, dritha]);

    jaya.addSpouse(dritha);
    dritha.addSpouse(jaya);

    const family = createFamilyTree([chit, amba, dritha, tritha, jaya, yodhan]);
    const yodhanPaternalAunties = family.getRelationship(yodhan, relationship.PATERNAL_AUNT);
    const yodhanMaternalAunties = family.getRelationship(yodhan, relationship.MATERNAL_AUNT);

    assert.deepEqual(yodhanMaternalAunties, []);
    assert.deepEqual(yodhanPaternalAunties, [tritha]);
  });

  it("should return ish as paternal-uncle for yodhan as he is brother of his father jaya", () => {
    const chit = new Member("Chit", gender.MALE);
    const amba = new Member("Amba", gender.FEMALE);
    const tritha = new Member("Tritha", gender.FEMALE, [chit, amba]);
    const ish = new Member("Ish", gender.MALE, [chit, amba]);
    const jaya = new Member("Jaya", gender.MALE, [chit, amba]);
    const dritha = new Member("Dritha", gender.FEMALE);
    const yodhan = new Member("Yodhan", gender.MALE, [jaya, dritha]);

    jaya.addSpouse(dritha);
    dritha.addSpouse(jaya);

    const family = createFamilyTree([chit, amba, dritha, tritha, jaya, yodhan, ish]);
    const yodhanPaternalAunties = family.getRelationship(
      yodhan,
      relationship.PATERNAL_AUNT
    );
    const yodhanPaternalUncles = family.getRelationship(
      yodhan,
      relationship.PATERNAL_UNCLE
    );

    assert.deepEqual(yodhanPaternalUncles, [ish]);
    assert.deepEqual(yodhanPaternalAunties, [tritha]);
  });

  it("should return atya and yaya as sister-in-law for satvy as they are sisters of her husband", () => {
    const vyan = new Member("Vyan", gender.MALE);
    const satya = new Member("Satya", gender.FEMALE);
    vyan.addSpouse(satya);
    satya.addSpouse(vyan);
    const atya = new Member("Atya", gender.FEMALE, [vyan, satya]);
    const asva = new Member("Asva", gender.MALE, [vyan, satya]);
    const satvy = new Member("Satvy", gender.FEMALE);
    asva.addSpouse(satvy);
    satvy.addSpouse(asva);

    const family = createFamilyTree([vyan, satya, atya, asva, satvy]);

    family.addChild('Satya', 'Yaya', gender.FEMALE);

    const yaya = new Member('Yaya', gender.FEMALE, [vyan, satya]);

    const satvySisterInLaw = family.getRelationship(satvy, relationship.SISTER_IN_LAW);
    assert.deepEqual(satvySisterInLaw, [atya, yaya])
  });
});

describe("getMember", () => {
  it('should return Satya when there is a member in the family with satya name', () => {
    const satya = new Member("Satya", gender.FEMALE);
    const family = createFamilyTree([satya]);

    const result = family.getMember('Satya');

    assert.equal(result, satya);
  });

  it("should throw memberNotFoundError when there is no member with satya name", () => {
    const family = createFamilyTree([]);

    assert.throws(() => family.getMember("Satya"),MemberNotFoundError);
  });
});


