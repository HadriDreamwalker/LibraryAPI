/***********************************\
|			PUBLISHER				|
|			Model 					|
\***********************************/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PublisherSchema = new Schema ({
	name: {
		type: String,
		required: true
	},
	collections: [{
		type: Schema.ObjectId,
		ref: "Col",
		default: []
	}]
});

PublisherSchema.statics.addCollection = function(publishers_id, collection_id, callback) {
	this.update({_id: publishers_id}, {$push:{collections: collection_id}}, {multi: true}, callback);
}

PublisherSchema.statics.replaceCollection = function(publisher_id, old_collection_id, new_collection_id, callback) {
	this.findById(publisher_id, function(err, result) {
		if(err)
			return callback(err);
		if(!result)
			return callback("Publisher not found");

		result.removeCollection(old_collection_id);
		result.collections.push(new_collection_id);
		result.save(callback);
	})
}

PublisherSchema.methods.removeCollection = function(collection_id) {
	var index = this.collections.indexOf(collection_id);
	this.collections.splice(index, 1);
}

module.exports = mongoose.model("Publisher", PublisherSchema);