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
	authors: [{
		type: Schema.ObjectId,
		ref: "Author"
	}],
	type: {
		type: String,
		enum: ["short", "novel"]
	}
});

module.exports = mongoose.model("Story", StorySchema);