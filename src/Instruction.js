const { InvalidCommandError } = require("./error");
const relationshipMap = require('./relationship');

const nameConversion = (name) => name.replace("_"," ");
const getNamesOfMembers = members => members.map(member => member.name).join(" ");

class AddChildInstruction{
  constructor(params){
    [this.motherName, this.childName, this.gender] = params;
  }

  execute(family){
    try{
       const motherName = nameConversion(this.motherName);
      const childName = nameConversion(this.childName);
      family.addChild(motherName, childName, this.gender);
      return 'CHILD_ADDITION_SUCCEEDED';
    }catch(error){
      return error.getMessage();
    }
  }
}

class GetRelationshipInstruction{
  constructor(params){
    [this.name, this.relationship] = params;
  }

  execute(family){
    try{
      const memberName = nameConversion(this.name);
      const member = family.getMember(memberName);
      const relationship = relationshipMap[this.relationship.toUpperCase().replace(/-/g, "_")];
      const relatedMembers = family.getRelationship(member, relationship);
      if(relatedMembers.length > 0){
        return getNamesOfMembers(relatedMembers);
      }
      return "NONE";
    }catch(error){
      return error.getMessage();
    }
  }
}


const instructions = {
  ADD_CHILD: AddChildInstruction,
  GET_RELATIONSHIP: GetRelationshipInstruction,
};

Object.freeze(instructions);

createInstruction = (input) => {
  const [command, ...params] = input.split(" ");
  const instruction = instructions[command.toUpperCase()];
  if(!instruction){
    throw new InvalidCommandError();
  }
  return new instruction(params);
}

module.exports = createInstruction;