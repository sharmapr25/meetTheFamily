const {createReadStream} = require('fs');
const readline = require("readline");
const path = require('path');
const createInstruction = require("./src/Instruction");
const setup = require("./setup");

const filePath = path.resolve(__dirname, 'input.txt');

const family = setup();

const readInterface = readline.createInterface({
  input: createReadStream(filePath),
});

readInterface.on('line', line=> {
  if(line){
    try {
      const instruction = createInstruction(line);
      instruction.execute(family);
    } catch (error) {
      if (error.getMessage) {
        console.log(error.getMessage());
      } else {
        console.log(error);
      }
    }
  }

})