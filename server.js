const express = require('express')
const res = require('express/lib/response')
const app = express()

const args = require('minimist')(process.argv.slice(2))
args['port']

const port = args.port || 5000

// Start an app server
const server = app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',port))
});

// Default response for any other request
app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
});

app.get('/app/', (req, res) => {
    res.status(200).end('OK')
    res.type('text/plain')
})

app.get("/app/flip/", (req,res) =>{
	var flip = coinFlip()
	return res.status(200).json({"flip" : flip})
})

app.get('/app/flip/call/:call', (req, res) => {
    res.status(200).json(flipACoin(req.params.call))
});

app.get('/app/flips/:number', (req, res) => {
	const flips = coinFlips(req.params.number)
	var final = countFlips(flips)
	return res.status(200).json({"raw" : flipResults, "result": final})
	//go
	//here
});

function coinFlip() {
	var randInt = Math.floor(Math.random()*2);
	if(randInt == 1){
	  return "heads";
	}
	return "tails";
  }

function coinFlips(flips) {
	var finalArr = new Array(flips);
	for(let i = 0; i < finalArr.length; i++){
	  finalArr[i] = coinFlip();
	}
	return finalArr;
  }

  function countFlips(array) {
	let countResult = {heads: 0, tails: 0}
	for(let i = 0; i < array.length; i++){
	  if(array[i] == "heads"){
		countResult.heads +=1; 
	  }
	  else{
		countResult.tails +=1;
	  }
	}
	return countResult;
 }

 function flipACoin(call) {
	var flipRes = coinFlip();
	var result = "";
	if(call == flipRes){
	  result = "win";
	}
	else{
	  result = "lose";
	}
	return {call: call, flip: flipRes, result: result};
  }

  