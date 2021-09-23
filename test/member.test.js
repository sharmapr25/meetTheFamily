const Member = require("../src/Member");
const gender = require("../src/gender");

describe('isFemale', () => {
  it('should return true when given member is female', () => {
    const member = new Member('Aria', gender.FEMALE);
    expect(member.isFemale()).toBeTruthy();
  })

  it("should return false when given member is not female", () => {
    const member = new Member("Asva", gender.MALE);
    expect(member.isFemale()).toBeFalsy();
  });
});

describe('isSameMember', () => {
  it('should return true when given two members are same', () => {
    const aria = new Member("Aria", gender.FEMALE);
    expect(aria.isSameMember(aria)).toBeTruthy();
  });

  it("should return false when given two members has different name", () => {
    const aria = new Member("Aria", gender.FEMALE);
    const satya = new Member("Satya", gender.FEMALE);
    expect(aria.isSameMember(satya)).toBeFalsy();
  });
});

describe("isSiblingOf", () => {
  it("should return true when given members are siblings", () => {
    const kingShan = new Member("King Shan", gender.MALE);
    const queenAnga = new Member("Queen Anga", gender.FEMALE);
    kingShan.addSpouse(queenAnga);
    queenAnga.addSpouse(kingShan);

    const aria = new Member("Aria", gender.FEMALE, [kingShan, queenAnga]);
    const asva = new Member("Asva", gender.MALE, [kingShan, queenAnga]);
    expect(aria.isSiblingOf(asva)).toBeTruthy();
  });

  it("should return false when given members are not siblings", () => {
    const aria = new Member("Aria", gender.FEMALE);
    const asva = new Member("Asva", gender.MALE);

    expect(aria.isSiblingOf(asva)).toBeFalsy();
  });

  it("should return false when given member is same", () => {
    const aria = new Member("Aria", gender.FEMALE);
    expect(aria.isSiblingOf(aria)).toBeFalsy();
  });

  it("should return false when given members have different parents", () => {
    const kingShan = new Member("King Shan", gender.MALE);
    const queenAnga = new Member("Queen Anga", gender.FEMALE);
    const aria = new Member("Aria", gender.FEMALE, [kingShan, queenAnga]);

    const chita = new Member("chita", gender.MALE);
    const satya = new Member("satya", gender.FEMALE);
    const asva = new Member("Asva", gender.MALE, [chita, satya]);

    expect(aria.isSiblingOf(asva)).toBeFalsy();
  });
});

describe('isChildOf', () => {
  it('should return true when given aria is child of king shan and queen anga', () => {
    const kingShan = new Member("King Shan", gender.MALE);
    const queenAnga = new Member("Queen Anga", gender.FEMALE);
    const aria = new Member("Aria", gender.FEMALE, [kingShan, queenAnga]);

    expect(aria.isChildOf(kingShan)).toBeTruthy();
    expect(aria.isChildOf(queenAnga)).toBeTruthy();
  });

 it("should return false when aria is not child of king shan", () => {
   const kingShan = new Member("King Shan", gender.MALE);
   const aria = new Member("Aria", gender.FEMALE);

   expect(aria.isChildOf(kingShan)).toBeFalsy();
 });
});

describe("getParentBasedOnValidation", () => {
  const amba = new Member("Amba", gender.FEMALE);
  const jaya = new Member("Jaya", gender.MALE);
  amba.addSpouse(jaya);
  jaya.addSpouse(amba);
  const yodhan = new Member('Yodhan', gender.MALE, [jaya, amba]);

  it('should return amba for given member yodhan with validation of getting mother', () => {
    const parent = yodhan.getParentBasedOnValidation((parent) => parent.isFemale())
    expect(parent).toEqual(amba);
  })

  it("should return jaya for given member yodhan with validation of getting father", () => {
    const parent = yodhan.getParentBasedOnValidation((parent) =>!parent.isFemale());
    expect(parent).toEqual(jaya);
  });
});