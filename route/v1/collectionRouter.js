/*****************************************************\
|						COLLECTION					  |
|						Router 						  |
\*****************************************************/

var express = require('express');
var router = express.Router();

var Collection = require('../../models/collectionModel.js');
var Publisher = require('../../models/publisherModel.js');

var middleware = require('../../lib/middleware.js');
var merge = require('merge');

//Routes that ends in /collection
router.route('/')

	.get(function(req, res) {
		Collection.find().populate("publishers").exec(function(err, result) {
			if(err)
				return res.send(500, err);

			res.send(200, result);
		});
	})

	.post(function(req, res) {
		var collection = new Collection(req.body);
		if(collection.publishers){
			Publisher.addCollection(collection.publishers, collection._id, function(err, result) {
				if(err)
					return res.send(500, err);

				collection.save(function(err) {
					if(err)
						return res.send(500, err);
					res.send(201, collection);
				});	

			})
		} else {
			collection.save(function(err) {
				if(err)
					return res.send(500, err);
				res.send(201, collection);
			});
		}
	});

// Routes that ends in /:collection_id
router.route('/:collection_id')

.get(function(req, res) {
	Collection.findById(req.params.collection_id, function(err, result) {
		if(err)
			return res.send(500, err);
		res.send(200, result);
	});
})

.put(function(req, res) {
	Collection.findById(req.params.collection_id, function(err, result) {
		if(err)
			return res.send(500, err);
		merge(result, req.body);
		result.save(function(err) {
			if(err)
				return res.send(500, err);
			res.send(200, result);
		});
	});
})

.delete(function(req, res) {
	Collection.remove({
		_id: req.params.collection_id
	}, function (err, result) {
		if(err)
			res.send(500, err);
		res.send(204);
	});
});


module.exports = router;