// server.js (from https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4)

// Base Setup
//=======================================================

// Call the packages
var express = require ('express');
var bodyParser = require('body-parser');
var app = express();

// Configure app to user bodyParser()
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/libraryv1');
mongoose.set("debug", true);

// Routes for our API
//=======================================================

// Middleware to use for all requests
app.use(function(req, res, next) {
	console.log("Something is happening!");
	next(); // Make sure we go to the next routes
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, DELETE, POST");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var publisher 	=	require('./route/v1/publisherRouter.js'); //*.js optionnel
var author 		= 	require('./route/v1/authorRouter.js');
var serie 		= 	require('./route/v1/serieRouter.js');
var collection 	=	require('./route/v1/collectionRouter.js');
var story		=	require('./route/v1/storyRouter.js');
var book		= 	require('./route/v1/bookRouter.js');


// Register our routes --------------------------------------
app.use('/v1/publishers', publisher);
app.use('/v1/authors', author);
app.use('/v1/series', serie);
app.use('/v1/collections', collection);
app.use('/v1/stories', story);
app.use('/v1/books', book);

// Start the server
//=======================================================
app.listen(port);
console.log('Magic happens on port ' + port);