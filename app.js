var express= require('express');
var request = require('request'); // "Request" library

var app =  express();

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.use(express.static('views'));
app.use(express.static('public'));

var client_id = '2367dfbe125f41368e5328db4ed5fa20'; // Your client id
var client_secret = 'a344ef2ab3ab4ff5a88e0bf826014673'; // Your secret
var token;

app.get('/', function(req,res){
	res.sendFile(_dirname + "/" + "index.html");
});

app.get('/test', function(req,res){
	res.send("test");
});


var server = app.listen(2000, function(){
	var host= server.address().address
	var port = server.address().port

	console.log("example app listening at http://%s:%s", host, port)
})

/**
 * This is an example of a basic node.js script that performs
 * the Client Credentials oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#client_credentials_flow
 */



// your application requests authorization
var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

request.post(authOptions, function(error, response, body) {
  if (!error && response.statusCode === 200) {

    // use the access token to access the Spotify Web API
    token = body.access_token;
    var options = {
      url: 'https://api.spotify.com/v1',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      json: true
    };
    request.get(options, function(error, response, body) {
      console.log(body);
    });
  }
});

app.get('/search', function(req,res){
	res.send("" + token);
	console.log(token);
});


