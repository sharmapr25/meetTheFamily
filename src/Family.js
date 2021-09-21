const { ChildAdditionFailedError } = require("./error");
const MemberNotFoundError = require("./error/MemberNotFoundError");
const Member = require("./Member");

class Family{
  constructor(){
    this.members = {};
  }

  addMembers(membersToAdd){
    membersToAdd.forEach(member => {
      this.members[member.name] = member;
    })
  }

  addChild(motherName, name, gender){
    const member = this.members[motherName];
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
    const member = this.members[memberName];
    if(!member){
      throw new MemberNotFoundError();
    }
    return member;
  }

  getRelationship(member, relationship){
    return relationship.of(this.members, member);
  }
}

module.exports = Family;