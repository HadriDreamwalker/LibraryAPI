/***********************************\
|			SERIE 					|
|			Model 					|
\***********************************/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SerieSchema = new Schema ({
	name: {
		type: String,
		required: true
	},
	finished: {
		type: Boolean,
		default: false
	},
	nbTomes: {
		type: Number,
		default: 1,
		min: 1
	}
});

module.exports = mongoose.model("Serie", SerieSchema);