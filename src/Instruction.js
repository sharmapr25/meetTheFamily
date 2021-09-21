const { InvalidCommandError } = require("./error");
const relationshipMap = require('./relationship');

const nameConversion = (name) => name.replace("_"," ");
const printName = members => console.log(members.map(member => member.name).join(" "));

class AddChildInstruction{
  constructor(params){
    [this.motherName, this.childName, this.gender] = params;
  }

  execute(family){
    const motherName = nameConversion(this.motherName);
    const childName = nameConversion(this.childName);
    family.addChild(motherName, childName, this.gender);
    console.log('CHILD_ADDITION_SUCCEEDED');
  }
}

class GetRelationshipInstruction{
  constructor(params){
    [this.name, this.relationship] = params;
  }

  execute(family){
    const memberName = nameConversion(this.name);
    const member = family.getMember(memberName);
    const relationship = relationshipMap[this.relationship.toUpperCase().replace(/-/g, "_")];
    const relatedMembers = family.getRelationship(member, relationship);
    if(relatedMembers.length > 0){
      printName(relatedMembers);
    }else{
      console.log("NONE");
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