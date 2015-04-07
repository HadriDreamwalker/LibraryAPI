/*****************************************************\
|						Publisher 					  |
|						Route 	 					  |
\*****************************************************/

var express = require('express');
var router = express.Router();

var Publisher = require('../../models/publisherModel.js');
var Collection = require('../../models/collectionModel.js');

var middleware = require('../../lib/middleware.js');

// on routes that end in /publisher
//-----------------------------------------------------------
router.route('/')

// Create a publisher
.post(
	middleware.checkBody.bind(this, "name"),
	function(req, res) {
		var publisher = new Publisher(req.body);
		publisher.save(function(err){
			if(err)
				return res.send(500, err);

			res.send(201, publisher);
		});
	}
)

// Get all publishers
.get(function(req, res) {
	Publisher.find(function(err, result) {
		if(err)
			return res.send(500, err);

		res.send(200, result);
	});
});

// on routes that end in /:publisher_id
//-----------------------------------------------------------
router.route('/:publisher_id')

// Get the publisher
.get(
	function(req, res) {
		Publisher.findById(req.params.publisher_id, function(err, result) {
				if(err)
					return res.send(500, err);

				res.send(200, result);
		});
	}
)

// Update the publisher
.put(
	function(req, res) {
		Publisher.findById(req.params.publisher_id, function(err, result) {
				if(err)
					return res.send(500, err);

				result.name = req.body.name || result.name;
				result.collections = req.body.collections || result.collections;

				result.save(function(err) {
						if(err)
							res.send(500, err);

						res.send(200, result);
				});
		});
	}
)

// Delete the publisher
.delete(
	function(req, res) {
		Collection.removePublisher(req.params.publisher_id, function(err) {
			if(err)
				return res.send(500, err);
			Publisher.remove({
				_id: req.params.publisher_id
			}, function(err, result) {
				if(err)
					return res.send(500, err);

				res.send(204);
			});
		});
	}
);

module.exports = router;