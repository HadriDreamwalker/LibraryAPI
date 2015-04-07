/*****************************************************\
|						BOOK 						  |
|						Router 						  |
\*****************************************************/

var express = require('express');
var router = express.Router();

var Book = require('../../models/bookModel.js');

var middleware = require('../../lib/middleware.js');

// Routes that ends in /books
router.route('/')

.get(function(req, res) {
	Book.find(function(err, result) {
		if(err)
			return res.send(500, err);
		res.send(200, result);
	})
})

.post(
	middleware.checkBody.bind(this, 'name'),
	function(req, res) {
		var book = new Book(req.body);
		book.save(function(err) {
			if(err)
				return res.send(500, err);
			res.send(201, book);
		})
	}
);

// Routes that ends in /:book_id
router.route('/:book_id')

.get(function(req, res) {
	Book.findById(req.params.book_id, function(err, result) {
		if(err)
			return res.send(500, err);
		res.send(200, result);
	})
})

.put(function(req, res) {
	Book.findById(req.params.book_id, function(err, result) {
		if(err)
			return res.send(500, err);

		result.name = req.body.name || result.name;
		result.authors = req.body.authors || result.authors;
		result.publishers = req.body.publishers || result.publishers;
		result.col = req.body.collection || result.col;
		result.stories = req.body.stories || result.stories;
		result.tomeNum = req.body.tomeNum || result.tomeNum;
		result.publishingYear = req.body.publishingYear || result.publishingYear;
		result.synopsis = req.body.synopsis || result.synopsis;
		result.nbCopies = req.body.nbCopies || result.nbCopies;
		result.save(function(err) {
			if(err)
				return res.send(500, err);
			res.send(200, result);
		});
	});
})

.delete(function(req, res) {
	Book.remove({
		_id: req.params.book_id
	}, function(err, result) {
		if(err)
			return res.send(500, err);
		res.send(204);
	})
})


module.exports = router;