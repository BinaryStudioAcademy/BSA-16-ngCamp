var Repository = require('./generalRepository'),
    File = require('../schemas/fileSchema'),
    mongoose = require('mongoose');


function FileRepository() {
	Repository.prototype.constructor.call(this);
	this.model = File;
}

FileRepository.prototype = new Repository();

FileRepository.prototype.findFilesThatAvailableToUserByUserId = findFilesThatAvailableToUserByUserId;

function findFilesThatAvailableToUserByUserId(userId, callback) {
	var model = this.model;
	var query = model.find({
		allowedTo: {
			$in: [mongoose.Types.ObjectId(userId)]
		}
	})
	query.exec(callback);
};

module.exports = new FileRepository();