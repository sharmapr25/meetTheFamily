const Member = require("../src/Member");
const gender = require("../src/gender");

describe('isFemale', () => {
  it('should return true when given member is female', () => {
    const member = new Member('Aria', gender.F);
    expect(member.isFemale()).toBeTruthy();
  })

  it("should return false when given member is not female", () => {
    const member = new Member("Asva", gender.M);
    expect(member.isFemale()).toBeFalsy();
  });
});

describe("isSiblingOf", () => {
  it("should return true when given members are siblings", () => {
     const kingShan = new Member("King Shan", gender.M);
     const queenAnga = new Member("Queen Anga", gender.F);
     kingShan.addSpouse(queenAnga);
     queenAnga.addSpouse(kingShan);

    const aria = new Member("Aria", gender.F, [kingShan, queenAnga]);
    const asva = new Member("Asva", gender.M, [kingShan, queenAnga]);
    expect(aria.isSiblingOf(asva)).toBeTruthy();
  });

  it("should return false when given members are not siblings", () => {
    const aria = new Member("Aria", gender.F);
    const asva = new Member("Asva", gender.M);

    expect(aria.isSiblingOf(asva)).toBeFalsy();
  });

   it("should return false when given members are same", () => {
     const aria = new Member("Aria", gender.F);
     expect(aria.isSiblingOf(aria)).toBeFalsy();
   });

  it("should return false when given members have different parents", () => {
    const kingShan = new Member("King Shan", gender.M);
    const queenAnga = new Member("Queen Anga", gender.F);
    const aria = new Member("Aria", gender.F, [kingShan, queenAnga]);

     const chita = new Member("chita", gender.M);
     const satya = new Member("satya", gender.F);
    const asva = new Member("Asva", gender.M, [chita, satya]);

    expect(aria.isSiblingOf(asva)).toBeFalsy();
  });
});


describe('isSameMember', () => {
  it('should return true when given two members are same', () => {
    const aria = new Member("Aria", gender.F);
    expect(aria.isSameMember(aria)).toBeTruthy();
  });

  it("should return false when given two members has different name", () => {
    const aria = new Member("Aria", gender.F);
    const satya = new Member("Satya", gender.F);
    expect(aria.isSameMember(satya)).toBeFalsy();
  });
});