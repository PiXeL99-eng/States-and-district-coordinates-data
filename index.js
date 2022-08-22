var fs = require('fs');

// json file with the data
var data = fs.readFileSync('data.json');

var elements = JSON.parse(data);
const express = require("express");
const app = express();

// To solve the cors issue
const cors=require('cors');
	
app.listen(process.env.PORT,
	() => console.log("Server Start at the Port"));
	
app.use(express.static('public'));
app.use(cors());

// when get request is made, alldata() is called
app.get('/elements', alldata);

function alldata(request, response) {
	
	// Returns all information about the elements
	response.send(elements);
}

app.get('/elements/:statecode/', searchElement);

function searchElement(request, response) {
	var word = request.params.statecode;
    
	if(elements[word]) {
		var reply = elements[word];		
	}
	else {
		var reply = {
			status:"Not Found"
		}
	}
	
	response.send(reply);
}

//Final API created - https://states-districts-api.herokuapp.com/elements/BR
//The state code must be provided at the end to get the districts information of that particular state code