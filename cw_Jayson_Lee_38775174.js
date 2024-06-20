"use strict"; // do not modify or delete this line
var fs = require('fs');

//Task 1
data = "";
patterns=[];
frequencyCount=0;

//data is a string, patterns is an array of patterns
function find(data, patterns) {
	let frequencies={};
    let offsets={};

    let finalResults={};

    patterns.forEach((pattern) => {

        //recursive function here 
       let resultArray = repeatData(pattern, 0, [], data);

       //add length of offset value into frequencies 
       frequencyLength = resultArray.length; 

       offsets[pattern] = resultArray;
       frequencies[pattern] = frequencyLength;
    });

    finalResults['frequencies'] = frequencies;
    finalResults['offsets'] = offsets;
    return finalResults;
	
}

function repeatData(pattern, index, offsetArray, data) {
    displayValue = data.substr(index, pattern.length)

    // data substr
    if(displayValue == pattern){
        //adds offset index into offset array
        offsetArray.push(index);
    }

    if (index != data.length-1){
        ++index;
        //recursive call at very end
        repeatData(pattern, index, offsetArray, data);

    }


    //return array
    return offsetArray;

}


holdResult = find(data, patterns);

console.log(holdResult);

//use these for results of analyse1, analyse2 and analyse3
const results1 = {};
const results2 = {};
const results3 = {};

//Task 2
function analyse1(dataFile, patternFile){
	//your implementation goes here

    readFileAsyncWithCallback(dataFile, patternFile, processData);

}

function readFileAsyncWithCallback(path, patternFile, processData){ 
    fs.readFile( path,'utf8', function( err, data ) {
        processData(data, patternFile, readNextFile);

}) }

function processData(data, patternFile, readNextFile) {
    data = data.split(/\r?\n/);
    console.log(data);
    readNextFile(data, patternFile, compareFunc);
}

function readNextFile(data, patternFile, compareFunc) {
    fs.readFile(patternFile,'utf8', function( err, patterns) {
        patterns = patterns.split(/\r?\n/);
        compareFunc(data, patterns);
    })
}

function compareFunc(data, patterns) {

    data.forEach(dataElement => {
        results1[dataElement] = find(dataElement, patterns);
    });

    console.log(results1);

}

analyse1('file.data', 'file.pattern');

//Task 3
const readFilePromise = (filePath) => {

	//your implementation goes here
    return new Promise((resolve, reject) => {
        fs.readFile(filePath,'utf8', (err, data) => {
        
            data = data.split(/\r?\n/);

            if (err) reject(err);
        
            else resolve(data);
        }); 

    });

}

function analyse2(dataFile, patternFile){
	//your implementation goes here

    let promise1 = readFilePromise(dataFile);
    let promise2 = readFilePromise(patternFile);

    Promise.all([promise1,promise2]).then((files)=>{

        files[0].forEach(element => {
            results2[element]= find(element, files[1]);
            
        });
        console.log(results2);
    })

}

analyse2('file.data', 'file.pattern');


//Task 4 

//your implementation for analyse3 goes here
async function analyse3(dataFile, patternFile){
	//your implementation goes here

    let promise1 = await readFilePromise(dataFile);
    let promise2 = await readFilePromise(patternFile);

   promise1.forEach(element => {
    results3[element]= find(element, promise2);

   });
   console.log(results3);

}

analyse3('file.data', 'file.pattern');





//-------------------------------------------------------------------------------
//do not modify this function
function print(){
	console.log("Printing results...");
	Object.keys(results).forEach(function(elem){
		console.log("sequence: ", elem);
		console.log("frequencies are: ", results[elem].frequencies);
		console.log("offsets are: ", results[elem].offsets);
		console.log("---------------------------");
	});
}
//--------------- export the find function (required for the marking script)
module.exports ={find}; //do not modify this line
