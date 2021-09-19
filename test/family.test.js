const {MemberNotFoundError, ChildAdditionFailedError} = require('../src/error/index');
const Family = require('../src/Family');
const gender = require("../src/gender");
const Member = require("../src/Member");

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