/***********************************\
|			BOOK 					|
|			Model 					|
\***********************************/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema ({
	name: {
		type: String
	},
	authors: [{
		type: Schema.ObjectId,
		ref: "Author"
	}],
	publisher: {
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
	tomeNum: {
		type: Number,
		min: 0
	},
	publishingYeah: {
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