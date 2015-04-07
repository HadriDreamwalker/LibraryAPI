/***********************************\
|			AUTHOR					|
|			Model 					|
\***********************************/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AuthorSchema = new Schema ({
	name: {
		type: String,
		required: true
	},
	birthYear: {
		type: Number
	},
	deathYear: {
		type: Number
	}
});

module.exports = {
	Author: mongoose.model("Author", AuthorSchema)
}