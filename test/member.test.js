const assert = require("assert");
const Member = require("../src/member");
const gender = require("../src/gender");

describe("isFemale", () => {
  it("should return true when given member is female", () => {
    const member = new Member("Aria", gender.FEMALE);
    assert.ok(member.isFemale());
  });

  it("should return false when given member is not female", () => {
    const member = new Member("Asva", gender.MALE);
    assert.ok(!member.isFemale());
  });
});

describe("isSameMember", () => {
  it("should return true when given two members are same", () => {
    const aria = new Member("Aria", gender.FEMALE);
    assert.ok(aria.isSameMember(aria));
  });

  it("should return false when given two members has different name", () => {
    const aria = new Member("Aria", gender.FEMALE);
    const satya = new Member("Satya", gender.FEMALE);
    assert.ok(!aria.isSameMember(satya));
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
    assert.ok(aria.isSiblingOf(asva));
  });

  it("should return false when given members are not siblings", () => {
    const aria = new Member("Aria", gender.FEMALE);
    const asva = new Member("Asva", gender.MALE);

    assert.ok(!aria.isSiblingOf(asva));
  });

  it("should return false when given member is same", () => {
    const aria = new Member("Aria", gender.FEMALE);
    assert.ok(!aria.isSiblingOf(aria));
  });

  it("should return false when given members have different parents", () => {
    const kingShan = new Member("King Shan", gender.MALE);
    const queenAnga = new Member("Queen Anga", gender.FEMALE);
    const aria = new Member("Aria", gender.FEMALE, [kingShan, queenAnga]);

    const chita = new Member("chita", gender.MALE);
    const satya = new Member("satya", gender.FEMALE);
    const asva = new Member("Asva", gender.MALE, [chita, satya]);

    assert.ok(!aria.isSiblingOf(asva));
  });
});

describe("isChildOf", () => {
  it("should return true when given aria is child of king shan and queen anga", () => {
    const kingShan = new Member("King Shan", gender.MALE);
    const queenAnga = new Member("Queen Anga", gender.FEMALE);
    const aria = new Member("Aria", gender.FEMALE, [kingShan, queenAnga]);

    assert.ok(aria.isChildOf(kingShan));
    assert.ok(aria.isChildOf(queenAnga));
  });

  it("should return false when aria is not child of king shan", () => {
    const kingShan = new Member("King Shan", gender.MALE);
    const aria = new Member("Aria", gender.FEMALE);

    assert.ok(!aria.isChildOf(kingShan));
  });
});

describe("getParentBasedOnValidation", () => {
  const amba = new Member("Amba", gender.FEMALE);
  const jaya = new Member("Jaya", gender.MALE);
  amba.addSpouse(jaya);
  jaya.addSpouse(amba);
  const yodhan = new Member("Yodhan", gender.MALE, [jaya, amba]);

  it("should return amba for given member yodhan with validation of getting mother", () => {
    const parent = yodhan.getParentBasedOnValidation((parent) =>
      parent.isFemale()
    );
    assert.equal(amba, parent);
  });

  it("should return jaya for given member yodhan with validation of getting father", () => {
    const parent = yodhan.getParentBasedOnValidation(
      (parent) => !parent.isFemale()
    );
    assert.equal(jaya, parent);
  });
});
