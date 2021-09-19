class MemberNotFoundError extends Error{
  constructor(){
    super();
  }

  getMessage(){
    return 'PERSON_NOT_FOUND';
  }
}

module.exports = MemberNotFoundError;