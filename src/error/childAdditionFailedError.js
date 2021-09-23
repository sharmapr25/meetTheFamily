class ChildAdditionFailedError extends Error {
  constructor() {
    super();
    this._message = "CHILD_ADDITION_FAILED";
  }

  get message() {
    return this._message;
  }
}

module.exports = ChildAdditionFailedError;
