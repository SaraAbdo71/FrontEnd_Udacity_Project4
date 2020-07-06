var path = require('path');
const mockAPIResponse = require('./mockAPI.js');
var express =require('express');
const app = express();
var bodyParser= require('body-parser');
var cors = require('cors');
var requesting = require('./request')

app.use(cors())
app.use(bodyParser.json()) // to use json

app.use(express.static('../../dist'));

console.log(__dirname);

app.get('/', function (req, res) {
    res.sendFile(path.resolve('../../dist/index.html'));
});

// designates what port the app will listen to for incoming requests



app.get('/test', function (req, res) {
    console.log(mockAPIResponse);
    res.send(mockAPIResponse)
});

//post
app.post('/article',requesting.validateInputRequest, requesting.Posting); //call functions from requset.js

module.exports =app;