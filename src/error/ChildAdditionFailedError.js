class ChildAdditionFailedError extends Error {
  constructor() {
    super();
  }

  getMessage() {
    return "CHILD_ADDITION_FAILED";
  }
}

module.exports = ChildAdditionFailedError;
