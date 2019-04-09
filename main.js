
var fs = require('fs');
const inquirer = require('inquirer');
var canvas = require('./CodingChallenge/canvas.js/index.js');

var outputFile = "./outputCanvas.txt"

var questions = [{
  type: 'input',
  name: 'name',
  message: "What is the name of the file?",
}]

inquirer.prompt(questions).then(file => {

  let fileName = file.name.toString()

  fs.readFile(fileName, "utf8", function read(err, data) {
    if (err) {
      throw err;
    }
    let inputData = data.split("\n")

    processFile(inputData);
  })
});


function processFile(inputData) {

  let inputDataArr = [];

  for (var i = 0; i < inputData.length; i++) {
    inputDataArr.push(inputData[i].split(" "));
  }
  
  let num1 = parseInt(inputDataArr[0][1])
  let num2 = parseInt(inputDataArr[0][2])

  let finalResult = []

  if(inputDataArr[0][0] !== "C"){
    let errorMessage = "Need to create a canvas before creating shapes";
    console.log(errorMessage);
    fs.appendFileSync(outputFile, errorMessage);
    return;
  }

  for(var i = 1; i < inputDataArr.length; i++){
    let inputRow = inputDataArr[i]
    let type;


    if(inputRow[0] === "L"){
      if(inputRow[1] === inputRow[3]){
        type = "verticle"
      } else {
        type = "horizontal"
      }
    } if(inputRow[0] === "R"){
      type = "rectangle"
    }
    
    if(inputRow[0] === "B"){
      type = "fill"
      finalResult.push(canvas.canvasFun(num1, num2, type, inputRow[1], inputRow[2], inputRow[3], inputRow[4], "z"))
    } else {
      finalResult.push(canvas.canvasFun(num1, num2, type, inputRow[1], inputRow[2], inputRow[3], inputRow[4], ""))
    }
  }

  console.log(finalResult)

  for(var i = 0; i < finalResult.length; i++){
    for(var j = 0; j < finalResult[i].length; j++){
      fs.appendFileSync(outputFile, '\n' + finalResult[i][j])
    }
  }
}


