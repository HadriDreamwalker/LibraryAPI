/*****************************************************\
|						AUTHOR 						  |
|						Router 						  |
\*****************************************************/

var express = require('express');
var router = express.Router();

var Author = require('../../models/authorModel.js').Author;

var middleware = require('../../lib/middleware.js');

// Route that ends in /author
router.route('/')

// Create a new author
.post(
	middleware.checkBody.bind(this, "name"),
	function(req, res) {
		var author = new Author(req.body);
		author.save(function(err) {
			if(err)
				return res.send(500, err);

			res.send(201, author);
		});
	}
)

// Get all authors
.get(function(req, res) {
	Author.find(function(err, result) {
		if(err)
			return res.send(500, err);

		res.send(200, result);
	});
});

// Routes that ends in /author/author_id
router.route('/:author_id')

// Get the author
.get(
	function(req, res) {
		Author.findById(req.params.author_id, function(err, result) {
			if(err)
				return res.send(500, err);

			res.send(200, result);
		});
	}
)

// Update the author
.put(
	function(req, res) {
		Author.findById(req.params.author_id, function(err, result) {
			if(err)
				return res.send(500, err);
			if(!result)
				return res.send(404, err);

			result.name = req.body.name || result.name;
			result.birthYear = req.body.birthYear || result.birthYear;
			result.deathYear = req.body.deathYear || result.deathYear;
			
			result.save(function(err) {
				if(err)
					return res.send(500, err);

				res.send(200, result);
			});
		});
	}
)

// Delete the author
.delete(
	function(req, res) {
		Author.remove({
			_id: req.params.author_id
		}, function(err, result){
			if(err)
				return res.send(500, err);

			res.send(204);
		});
	}
);

module.exports = router;