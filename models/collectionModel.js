/***********************************\
|			COLLECTION				|
|			Model 					|
\***********************************/


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CollectionSchema = new Schema ({
	name: {
		type: String,
		required: true
	},
	publisher: {
		type: Schema.ObjectId,
		ref: "Publisher"
	}
});

CollectionSchema.set("toJSON", {
	transform: function(obj, ret){
		delete ret.__v;
		return ret;
	}
})

module.exports = mongoose.model("Col", CollectionSchema);