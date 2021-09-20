const {MemberNotFoundError, ChildAdditionFailedError} = require('../src/error/index');
const Family = require('../src/Family');
const gender = require("../src/gender");
const Member = require("../src/Member");
const relationship = require('../src/relationship');

describe('addChild', () => {
  it("should add Chitra as Aria's child when aria is already member of family tree", () => {
    const family = new Family();
    const aria = new Member('Aria', gender.F);
    const asva = new Member("Asva", gender.M);

    aria.addSpouse(asva);
    asva.addSpouse(aria);
    family.addMember(aria);
    family.addMember(asva);

    family.addChild(aria, 'Chitra', gender.F);

    const expectedResult = new Member('Chitra', gender.F, [asva, aria]);

    expect(family.getMember('Chitra')).toEqual(expectedResult);
  });

  it("should throw member not found error when add Chitra as aria's child where aria doesn't exist in family tree", () => {
    const family = new Family();
    const aria = new Member("Aria", gender.F);

    expect(() => family.addChild(aria, "Chitra", gender.F)).toThrow(MemberNotFoundError);
  });

   it("should throw child addition failed error when try to add chitra as a child of asva who is a male", () => {
     const family = new Family();
     const aria = new Member("Aria", gender.F);
     const asva = new Member("Asva", gender.M);

     aria.addSpouse(asva);
     asva.addSpouse(aria);
     family.addMember(aria);
     family.addMember(asva);

     expect(() => family.addChild(asva, "Chitra", gender.F)).toThrow(
       ChildAdditionFailedError
     );
   });
});

describe('getRelationship', () => {
  it('should return asva when ask for atya siblings', () => {
    const family = new Family();

    const kingShan = new Member("King Shan", gender.M);
    const queenAnga = new Member("Queen Anga", gender.F);
    kingShan.addSpouse(queenAnga);
    queenAnga.addSpouse(kingShan);

    const atya = new Member("Atya", gender.F, [kingShan, queenAnga]);
    const asva = new Member("Asva", gender.M, [kingShan, queenAnga]);

    [kingShan, queenAnga, atya, asva].forEach(member => family.addMember(member));

    const atyaSiblings = family.getRelationship(atya, relationship.SIBLINGS);

    expect(atyaSiblings).toEqual([asva]);
  });

  it("should return asva and aria when satya has those two siblings", () => {
    const family = new Family();

    const kingShan = new Member("King Shan", gender.M);
    const queenAnga = new Member("Queen Anga", gender.F);
    kingShan.addSpouse(queenAnga);
    queenAnga.addSpouse(kingShan);

    const atya = new Member("Atya", gender.F, [kingShan, queenAnga]);
    const asva = new Member("Asva", gender.M, [kingShan, queenAnga]);
    const satya = new Member("Satya", gender.F, [kingShan, queenAnga]);


    [kingShan, queenAnga, atya, asva, satya].forEach((member) =>
      family.addMember(member)
    );

    const satyaSiblings = family.getRelationship(satya, relationship.SIBLINGS);

    expect(satyaSiblings).toEqual([atya, asva]);
  });

  it("should return asva when ask for king shan's son", () => {
    const family = new Family();

    const kingShan = new Member("King Shan", gender.M);
    const queenAnga = new Member("Queen Anga", gender.F);
    kingShan.addSpouse(queenAnga);
    queenAnga.addSpouse(kingShan);

    const asva = new Member("Asva", gender.M, [kingShan, queenAnga]);

    [kingShan, queenAnga, asva].forEach((member) =>
      family.addMember(member)
    );

    const kingShanSon = family.getRelationship(kingShan, relationship.SON);

    expect(kingShanSon).toEqual([asva]);
  });

  it("should return chit and vich when ask for king shan sons and king shan has three children", () => {
    const family = new Family();

    const kingShan = new Member("King Shan", gender.M);
    const queenAnga = new Member("Queen Anga", gender.F);
    kingShan.addSpouse(queenAnga);
    queenAnga.addSpouse(kingShan);

    const chit = new Member("Chit", gender.M, [kingShan, queenAnga]);
    const vich = new Member("Vich", gender.M, [kingShan, queenAnga]);
    const satya = new Member("Satya", gender.F, [kingShan, queenAnga]);


    [kingShan, queenAnga, chit, vich, satya].forEach((member) => family.addMember(member));

    const kingShanSons = family.getRelationship(kingShan, relationship.SON);

    expect(kingShanSons).toEqual([chit, vich]);
  });

  it("should return empty list when asva does not have any daughter", () => {
    const family = new Family();
    const asva = new Member("Asva", gender.M);
    family.addMember(asva);

    const asvaDaughters = family.getRelationship(asva, relationship.DAUGHTER);

    expect(asvaDaughters).toEqual([]);
  });

  it("should return satya when ask for king shan daugthers and king shan has three children", () => {
    const family = new Family();

    const kingShan = new Member("King Shan", gender.M);
    const queenAnga = new Member("Queen Anga", gender.F);

    const chit = new Member("Chit", gender.M, [kingShan, queenAnga]);
    const vich = new Member("Vich", gender.M, [kingShan, queenAnga]);
    const satya = new Member("Satya", gender.F, [kingShan, queenAnga]);

    [kingShan, queenAnga, chit, vich, satya].forEach((member) =>
      family.addMember(member)
    );

    const kingShanDaughters = family.getRelationship(kingShan, relationship.DAUGHTER);
    expect(kingShanDaughters).toEqual([satya]);
  });

  it("should return satvy and krpi as atya sister-in-law when both are spouse of atys's brothers", () => {
    const family = new Family();
    const kingShan = new Member("King Shan", gender.M);
    const queenAnga = new Member("Queen Anga", gender.F);

    const asva = new Member("Asva", gender.M, [kingShan, queenAnga]);
    const vyas = new Member("Vyas", gender.M, [kingShan, queenAnga]);
    const atya = new Member("Atya", gender.F, [kingShan, queenAnga]);
    const satvy = new Member("Satvy", gender.F);
    const krpi = new Member("Krpi", gender.F);

    asva.addSpouse(satvy);
    satvy.addSpouse(asva);
    vyas.addSpouse(krpi);
    krpi.addSpouse(vyas);

    [kingShan, queenAnga, asva, atya, satvy, vyas, krpi].forEach((member) =>
      family.addMember(member)
    );

    const atyaSisterInLaws = family.getRelationship(atya, relationship.SISTER_IN_LAW);

    expect(atyaSisterInLaws).toEqual([satvy, krpi]);
  });

  it("should return satya and krpi as atya sister-in-law when satya is spouse of atya brother and krpi is sister of her spouse", () => {
    const family = new Family();
    const kingShan = new Member("King Shan", gender.M);
    const queenAnga = new Member("Queen Anga", gender.F);

    const chit = new Member("Chit", gender.M);
    const amba = new Member("amba", gender.F);

    const asva = new Member("Asva", gender.M, [kingShan, queenAnga]);
    const atya = new Member("Atya", gender.F, [kingShan, queenAnga]);
    const satya = new Member("Satya", gender.F);
    asva.addSpouse(satya);
    satya.addSpouse(asva);
    const vyas = new Member("Vyas", gender.M, [chit, amba]);
    const krpi = new Member("Krpi", gender.F, [chit, amba]);
    vyas.addSpouse(atya);
    atya.addSpouse(vyas);

    [kingShan, queenAnga, asva, atya, satya, vyas, krpi].forEach((member) =>
      family.addMember(member)
    );

    const atyaSisterInLaws = family.getRelationship(
      atya,
      relationship.SISTER_IN_LAW
    );

    expect(atyaSisterInLaws).toEqual([satya, krpi]);
  });

  it("should return asva as asva is brother of krpi husband", () => {
    const family = new Family();
    const kingShan = new Member("King Shan", gender.M);
    const queenAnga = new Member("Queen Anga", gender.F);

    const asva = new Member("Asva", gender.M, [kingShan, queenAnga]);
    const vyas = new Member("Vyas", gender.M, [kingShan, queenAnga]);
    const krpi = new Member("Krpi", gender.F);

    vyas.addSpouse(krpi);
    krpi.addSpouse(vyas);

    [kingShan, queenAnga, asva, vyas, krpi].forEach((member) =>
      family.addMember(member)
    );

    const krpiBrotherInLaws = family.getRelationship(
      krpi,
      relationship.BROTHER_IN_LAW
    );

    expect(krpiBrotherInLaws).toEqual([asva]);
  });

  it("should return tritha as maternal-aunt for yodhan as she is sister of his mother dritha",
  () => {
    const family = new Family();
    const chit = new Member("Chit", gender.M);
    const amba = new Member("Amba", gender.F);
    const dritha = new Member("Dritha", gender.F, [chit, amba]);
    const tritha = new Member("Tritha", gender.F, [chit, amba]);

    const jaya = new Member("Jaya", gender.M);
    jaya.addSpouse(dritha);
    dritha.addSpouse(jaya);

    const yodhan = new Member("Yodhan", gender.M, [jaya, dritha]);

     [chit, amba, dritha, tritha, jaya, yodhan].forEach((member) =>
       family.addMember(member)
     );

    const yodhanMaternalAunties = family.getRelationship(yodhan, relationship.MATERNAL_AUNT);
    expect(yodhanMaternalAunties).toEqual([tritha]);

  })

});


