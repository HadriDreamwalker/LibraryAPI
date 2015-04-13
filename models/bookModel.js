/***********************************\
|			BOOK 					|
|			Model 					|
\***********************************/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema ({
	name: {
		type: String,
		required: true
	},
	authors: [{
		type: Schema.ObjectId,
		ref: "Author"
	}],
	publishers: {
		type: Schema.ObjectId,
		ref: "Publisher"
	},
	col: {
		type: Schema.ObjectId,
		ref: "Col"
	},
	stories: [{
		type: Schema.ObjectId,
		ref: "Story"
	}],
	serie: {
		type: Schema.ObjectId,
		ref: "Serie"
	},
	tomeNum: {
		type: Number,
		min: 0
	},
	publishingYear: {
		type: Number,
		min: 0
	},
	synopsis: {
		type: String
	},
	nbCopies: {
		type: Number,
		default: 1
	}
});

module.exports = mongoose.model("Book", BookSchema);