const assert = require("assert");

const assertError = (errorTrigger, errorType, errorMessage) => {
  try {
    errorTrigger();
  } catch (error) {
    assert.ok(error instanceof errorType);
    errorMessage && assert.equal(error.message, errorMessage);
  }
};

module.exports = assertError;
