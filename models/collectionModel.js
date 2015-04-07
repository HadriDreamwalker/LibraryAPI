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
	publishers: [{
		type: Schema.ObjectId,
		ref: "Publisher"
	}]
});

CollectionSchema.set("toJSON", {
	transform: function(obj, ret){
		delete ret.__v;
		return ret;
	}
})

CollectionSchema.statics.removePublisher = function(publisher_id, callback) {
	this.update({publisher: publisher_id}, {$set:{publisher: null}}, {multi: true}, callback);
}

module.exports = mongoose.model("Col", CollectionSchema);

