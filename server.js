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
	var flipO = coinFlip()
	return res.status(200).json({"flip" : flipO})
})

app.get('/app/flip/call/:call', (req, res) => {
    res.status(200).json(flipACoin(req.params.call))
});

app.get('/app/flips/:number', (req, res) => {
	const flips = manyflips(req.params.number)
	var flipResults = coinFlips(flips)
	var final = countFlips(flipResults)
	return res.status(200).json({"raw" : flipResults, "result": final})
	//go
	//here
});