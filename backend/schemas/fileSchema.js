var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FileSchema = new Schema({
	url: String,
	description: String,
	creationDate: Date,
	allowedTo: [{
		type: Schema.Types.ObjectId,
		ref: 'User'
	}]
});

module.exports = mongoose.model('File', FileSchema);