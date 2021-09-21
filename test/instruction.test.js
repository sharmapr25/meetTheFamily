const { InvalidCommandError } = require("../src/error");
const createInstruction = require("../src/instruction");

describe('instruction', () => {
  it('should throw invalid command error when given instruction is not valid', () => {
    const error = () => createInstruction("hello");
    expect(error).toThrow(InvalidCommandError);
  });
})