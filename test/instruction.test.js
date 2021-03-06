const assert = require("assert");
const assertError = require("./lib/errorAssertion");
const Family = require("../src/family");
const gender = require("../src/gender");
const createInstruction = require("../src/instruction");
const Member = require("../src/member");
const { InvalidCommandError, MemberNotFoundError, ChildAdditionFailedError } = require("../src/error");

describe("createInstruction", () => {
  it("should throw error with INVALID_INPUT message when given instruction is not valid", () => {
    const error = () => createInstruction("hello");
    assertError(error, InvalidCommandError, "INVALID_INPUT");
  });

  it("should not throw any error when given instruction is correct", () => {
    createInstruction("ADD_CHILD satya kavya female");
  });
});

describe("AddChildInstruction", () => {
  const family = new Family();

  before(() => {
    const naveen = new Member("Naveen", gender.MALE);
    const satya = new Member("Satya", gender.FEMALE);
    naveen.addSpouse(satya);
    satya.addSpouse(naveen);
    family.addMembers([satya, naveen]);
  });

  it("should return CHILD_ADDITION_SUCCEEDED message when successfully added family member", () => {
    const instruction = createInstruction("ADD_CHILD Satya Kavya Female");
    const message = instruction.execute(family);

    assert.equal(message, "CHILD_ADDITION_SUCCEEDED");
  });

  it("should throw error with PERSON_NOT_FOUND message when mother does not exist in family tree", () => {
    const instruction = createInstruction("ADD_CHILD Nayana Kavya Female");
    const error = () => instruction.execute(family);

    assertError(error, MemberNotFoundError, "PERSON_NOT_FOUND");
  });

  it("should throw error with CHILD_ADDITION_FAILED message when try to add child to male in family tree", () => {
    const instruction = createInstruction("ADD_CHILD Naveen Kavya Female");
    const error = () => instruction.execute(family);

    assertError(error,ChildAdditionFailedError, "CHILD_ADDITION_FAILED");
  });

  it("should throw error with CHILD_ADDITION_FAILED message when try to add child to a female member who dees not have spouse", () => {
    const arya = new Member("Arya", gender.FEMALE);
    family.addMembers([arya]);

    const instruction = createInstruction("ADD_CHILD Arya Kavya Female");
    const error = () => instruction.execute(family);

    assertError(error,ChildAdditionFailedError, "CHILD_ADDITION_FAILED");
  });
});

describe("GetRelationshipInstruction", () => {
  const family = new Family();

  before(() => {
    const naveen = new Member("Naveen", gender.MALE);
    const satya = new Member("Satya", gender.FEMALE);
    const kavya = new Member("Kavya", gender.FEMALE, [naveen, satya]);
    naveen.addSpouse(satya);
    satya.addSpouse(naveen);
    family.addMembers([satya, naveen, kavya]);
  });

  it("should return Kavya when try to get daughter of satya", () => {
    const instruction = createInstruction("GET_RELATIONSHIP Satya Daughter");
    const message = instruction.execute(family);
    assert.equal(message, "Kavya");
  });

  it("should return NONE when naveen doesn't have a son", () => {
    const instruction = createInstruction("GET_RELATIONSHIP Naveen Son");
    const message = instruction.execute(family);

    assert.equal(message, "NONE");
  });
});
