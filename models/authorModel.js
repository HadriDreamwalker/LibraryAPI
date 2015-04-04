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
	}
});

module.exports = {
	Author: mongoose.model("Author", AuthorSchema)
}