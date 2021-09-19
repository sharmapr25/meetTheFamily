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