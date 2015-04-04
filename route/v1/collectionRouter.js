/*****************************************************\
|						COLLECTION					  |
|						Router 						  |
\*****************************************************/

var express = require('express');
var router = express.Router();

var Collection = require('../../models/collectionModel.js');

var middleware = require('../../lib/middleware.js');

//Routes that ends in /collection
router.route('/')

	.get(function(req, res) {
		Collection.find().populate("publisher").exec(function(err, result) {
			if(err)
				return res.send(500, err);

			res.send(200, result);
		});
	})

	.post(function(req, res) {
		var collection = new Collection(req.body);
		collection.save(function(err) {
			if(err)
				return res.send(500, err);
			res.send(201, collection);
		});
	});


module.exports = router;