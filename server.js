const express = require('express')
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


app.get('/app/flips/:number', (req, res) => {
	const flips = manyflips(req.params.number)
	//Other
	//expressions
	//go
	//here
});