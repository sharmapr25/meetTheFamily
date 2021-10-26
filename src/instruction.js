const { InvalidCommandError } = require("./error");
const relationshipMap = require('./relationship');
const genderMap = require('./gender');

const nameConversion = (name) => name.replace("_"," ");
const getNamesOfMembers = members => members.map(member => member.name).join(" ");


class AddChildInstruction{
  constructor(params){
    [this._motherName, this._childName, this._gender] = params;
  }

  execute(family){
    const motherName = nameConversion(this._motherName);
    const childName = nameConversion(this._childName);
    family.addChild(motherName, childName, genderMap[this._gender.toUpperCase()]);
    return 'CHILD_ADDITION_SUCCEEDED';
  }

}

class GetRelationshipInstruction {
  constructor(params) {
    [this._name, this._relationship] = params;
  }

  getRelationship(){
    return relationshipMap[this._relationship.toUpperCase().replace(/-/g, "_")];
  }

  execute(family) {
    const member = family.getMember(nameConversion(this._name));
    const relationship = this.getRelationship();
    const relatedMembers = family.getRelationship(member, relationship);
    return relatedMembers.length > 0 ? getNamesOfMembers(relatedMembers): "NONE";
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