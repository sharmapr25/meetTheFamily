const { ChildAdditionFailedError } = require("./error");
const MemberNotFoundError = require("./error/MemberNotFoundError");
const Member = require("./Member");

class Family{
  constructor(){
    this.members = {};
  }

  addMember(member){
    this.members[member.name] = member;
  }

  addChild(mother, name, gender){
    const member = this.members[mother.name];
    if(!member){
      throw new MemberNotFoundError();
    }
    if(!member.isFemale()){
      throw new ChildAdditionFailedError();
    }
    if(member.spouse){
      const newMember = new Member(name, gender, [member.spouse, member]);
      this.members[name] = newMember;
    }
  }

  getMember(memberName){
    return this.members[memberName];
  }

  getRelationship(member, relationship){
    return relationship.of(this.members, member);
  }
}

module.exports = Family;