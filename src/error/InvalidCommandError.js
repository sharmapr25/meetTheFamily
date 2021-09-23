class InvalidCommandError extends Error {
  constructor() {
    super();
    this._message = "INVALID_INPUT";
  }

  get message() {
    return this._message;
  }
}

module.exports = InvalidCommandError;
