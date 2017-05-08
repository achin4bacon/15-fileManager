// Include fs module
var fs = require("fs");

function useStdin() {
	var input = process.stdin.read();

	if (input === null) {
		return;
	}

	// convert to string, trim whitespace, split to array of words
	var inputSplit = input.toString().trim().split(" ");

	if (inputSplit[0] === "cat") {
		catFile(inputSplit[1]);
		//if inputSplit at 0 is cat -- run catFile function
	} else if (inputSplit[0] === "touch") {
		touchFile(inputSplit[1]);
		//if inputSplit at 0 is touch -- run touchFile function
	}
	else if (inputSplit[0] === "rm") {
		removeFile(inputSplit[1]);
	}
	else if (inputSplit[0] === "replace") {
		replaceWord(inputSplit[1], inputSplit[2], inputSplit[3]);
		//if inputSplit at 0 is replace -- run replaceFile function
	}
	else if (inputSplit[0] === "grep") {
		grepFile(inputSplit[1], inputSplit[2]);
		//if inputSplit at 0 is grep -- run grepFile function
	}
	else if (inputSplit[0] === "grepx") {
		grepRegEx(inputSplit[1], inputSplit[2]);
		//if inputSplit at 0 is grep -- run grepFile function
	}
	else if (inputSplit[0] === 'mkdir'){
		makeDirectory(iputSplit[1]);
	}
	else if (inputSplit[0] === 'rmdir'){
		removeDirectory(iputSplit[1]);
	}
}

process.stdin.on("readable", useStdin);
//uses standard in 


   ///////////////
  ///catFile/////
 ///////////////
function catFile(fileName) {
	fs.readFile(fileName, function (err, data) {
		//use FS; reads file and calls it on fileName which is called in
		if (err) {
			console.log(err);
			//print error if something is wrong
			return;
		}
		console.log(data.toString());
		//displays data as string
	});
}

   ///////////////
  ///touchFile///
 ///////////////
function touchFile(fileName) {
	fs.appendFile(fileName, "", function (err) {
		//append data to file
		if (err) {
			console.log(err);
			//print error if something is wrong
			return;
		}
		console.log("Touched file!");
	});
}

   ///////////////
  ///removeFile//
 ///////////////
function removeFile(fileName) {
	fs.unlink(fileName, function (err) {
		if (err) {
			console.log(err);
			return;
		}
		console.log("You've removed the file!");
	});
}

   ///////////////
  //replaceWord//
 ///////////////
function replaceWord(fileName, oldWord, newWord) {
	fs.readFile(fileName, function (err, data) {
		if (err) {
			//print error if something is wrong
			console.log(err);
			return;
		}
		var newText = data.toString().split(oldWord).join(newWord);
		fs.writeFile(fileName, newText, function (err) {
			if (err) {
				console.log(err);
				//print error if something is wrong
				return;
			}
			console.log("Okay! Replaced.");
		});
	});
}

   ///////////////
  ///grepFile////
 ///////////////
function grepFile(fileName, word){
    fs.readFile(fileName, function(err, data){
        if(err){
            console.log(err);
        }
        data = data.toString(); data = data.split("\n");
        for(var i = 0; i < data.length; i++){
            if(data[i].includes(word)){
                console.log('these lines have that word! Check it out!!! ' + data[i]);
            }
        }
    });
}

   ///////////////
  ///grepRegEx///
 ///////////////
function grepRegEx(fileName, word){
	word = new RegExp(word, 'g');
	//creates new Reg Exp - word as a reg exp and g for global
    fs.readFile(fileName, function(err, data){
        if(err){
            console.log(err);
			//print error if error
        }
        data = data.toString(); data = data.split("\n");
        for(var i = 0; i < data.length; i++){
            if(data[i].match(word)){
                console.log('these lines have that word! Check it out!!! ' + data[i]);
            }
        }
    });
}

   ////////////////
  //makeDirectory/
 ////////////////
function makeDirectory(directory){
    fs.mkdir(directory, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("You done made " + directory + "!!!!");
        }
    });
}

   //////////////////
  //removeDirectory/
 //////////////////
function removeDirectory(directory){
	fs.rmdir(directory, function(err){
		if(err){
			console.log(err);
		}else{
			console.log("You done deleted " + directory + "!!!!");
		}
	});
}

	// /n -- split
/*
	
--writefile 
	* find a line in a file
		"grep" <file name> <word to find>
		> grep hello.txt hello
			print out all of the lines in hello.txt that contain "hello"
		> grep what.txt there
			print out all of the lines in what.txt that contain "there"

	Bonus work:
		* Ask for confirmation before deleting a file
		* Don't let people delete files that are above the current working directory (i.e. disallow "../")
		* Have grep take a regular expression as the word to find
		******Create mkdir and rmdir
*/

