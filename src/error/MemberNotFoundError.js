class MemberNotFoundError extends Error {
  constructor() {
    super();
    this._message = "PERSON_NOT_FOUND";
  }

  get message() {
    return this._message;
  }
}

module.exports = MemberNotFoundError;