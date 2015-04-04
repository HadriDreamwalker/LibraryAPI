/***********************************\
|			STORY 					|
|			Model 					|
\***********************************/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StorySchema = new Schema ({
	name: {
		type: String,
		required: true
	},
	Author: [{
		type: Schema.ObjectId,
		ref: "Author"
	}],
	type: {
		type: String,
		enum: ["Short", "Novel"]
	},
	serie: {
		type: Schema.ObjectId,
		ref: "Serie"
	}
});

module.exports = mongoose.model("Story", StorySchema);