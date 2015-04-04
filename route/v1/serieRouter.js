/*****************************************************\
|						SERIE 						  |
|						Router 						  |
\*****************************************************/

var express = require('express');
var router = express.Router();
var merge = require('merge');

var Serie = require('../../models/serieModel.js');

var middleware = require('../../lib/middleware.js');

// Routes that ends in /serie
router.route('/')

.get(function(req, res) {
	Serie.find(function(err, result) {
		if(err)
			return res.send(500, err);

		res.send(200, result);
	})
})

.post(
	middleware.checkBody.bind(this, "name"),
	function(req, res) {
		var serie = new Serie(req.body);
		serie.save(function(err) {
			if(err)
				return res.send(500, err);

			res.send(201, serie);
		});
	}
)

// Routes that ends in /serie_id
router.route('/:serie_id')

.get(function(req, res) {
	Serie.findById(req.params.serie_id, function(err, result) {
		if(err)
			return res.send(500, err);

		res.send(200, result);
	});
})

.put(
	middleware.checkParams.bind(this, "serie_id"),
	function(req, res) {
		Serie.findById(req.params.serie_id, function(err, result) {
			if(err)
				return res.send(500, err);

			merge(result, req.body);
			result.save(function(err) {
				if(err)
					return res.send(500, err);

				res.send(200, result);
			});
		});
	}
)

.delete(
	middleware.checkParams.bind(this, "serie_id"),
	function(req, res) {
		Serie.remove({
			_id: req.params.serie_id
		}, function(err, result) {
			if(err)
				return res.send(500, err);

			res.send(204);
		});
	}
);

module.exports = router;