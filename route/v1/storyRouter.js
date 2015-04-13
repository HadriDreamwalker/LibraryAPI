/*****************************************************\
|						STORY 						  |
|						Router 						  |
\*****************************************************/

var express = require('express');
var router = express.Router();

var Story = require('../../models/storyModel.js');
var middleware = require('../../lib/middleware.js');

// Routes that ends in /stories
router.route('/')

.get(function(req, res) {
	Story.find(function(err, result) {
		if(err)
			return res.send(500, err);
		res.send(200, result);
	})
})

.post(
	middleware.checkBody.bind(this, 'name'),
	function(req, res) {
		var story = new Story(req.body);
		story.save(function(err) {
			if(err)
				return res.send(500, err);
			res.send(201, story);
		});
	}
);

// Routes that ends in /storis/:story_id
router.route('/:story_id')

.get(function(req, res) {
	var embed = req.param("embed") ? req.param("embed").split(",") : [];
	Story.findById(req.params.story_id).populate(embed.join(" ")).exec(function(err, result) {
		if(err)
			return res.send(500, err)
		res.send(200, result);
	});
})

.put(function(req, res) {
	Story.findById(req.params.story_id, function(err, result) {
		if(err)
			return res.send(500, err);

		result.name = req.body.name || result.name;
		result.authors = req.body.authors || result.authors;
		result.type = req.body.type || result.type;
		result.serie = req.body.type || result.type;
		result.save(function(err) {
			if(err)
				return res.send(500, err);
			res.send(200, result);
		})
	})
})

.delete(function(req, res) {
	Story.remove({
		_id: req.params.story_id
	}, function(err, result) {
		if(err)
			return res.send(50, err);
		res.send(204);
	})
});

module.exports = router;