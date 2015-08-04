var express = require('express');
var app = express();

app.get('/', function(req, res){
	res.send('Hello world from server.js');
}).listen(5000);

console.log('Server Running on port 3000');