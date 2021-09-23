const { ChildAdditionFailedError } = require("./error");
const MemberNotFoundError = require("./error/memberNotFoundError");
const Member = require("./member");

class Family{
  constructor(){
    this._members = {};
  }

  addMembers(membersToAdd){
    membersToAdd.forEach(member => {
      this._members[member.name] = member;
    })
  }

  addChild(motherName, name, gender){
    const member = this._members[motherName];
    if(!member){
      throw new MemberNotFoundError();
    }
    if(!member.isFemale() || !member.spouse){
      throw new ChildAdditionFailedError();
    }

    const newMember = new Member(name, gender, [member.spouse, member]);
    this._members[name] = newMember;
  
  }

  getMember(memberName){
    const member = this._members[memberName];
    if(!member){
      throw new MemberNotFoundError();
    }
    return member;
  }

  getRelationship(member, relationship){
    return relationship.of(this._members, member);
  }
}

module.exports = Family;