var Repository = require('./generalRepository');
    File = require('../schemas/fileSchema');
    mongoose = require('mongoose');


function FileRepository() {
	Repository.prototype.constructor.call(this);
	this.model = File;
}

FileRepository.prototype = new Repository();

FileRepository.prototype.findFilesThatAvailableToUserByUserId = findFilesThatAvailableToUserByUserId;

function findFilesThatAvailableToUserByUserId(userId, callback) {
	var model = this.model;
	var query = model.aggregate([
  		{$unwind: "$allowedTo"}, 
  		{$match: {'allowedTo': mongoose.Types.ObjectId(userId)}},
  		{$sort: {
  		    "creationDate": -1
  		}}
	]);
	query.exec(callback);
};

module.exports = new FileRepository();