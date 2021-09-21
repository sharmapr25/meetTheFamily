class InvalidCommandError extends Error {
  constructor() {
    super();
  }

  getMessage() {
    return "INVALID_INPUT";
  }
}

module.exports = InvalidCommandError;
