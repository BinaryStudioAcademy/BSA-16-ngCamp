var connection = require('../db/dbConnect');
var Repository = require('./generalRepository');
var File = require('../schemas/file');

function FileRepository() {
	Repository.prototype.constructor.call(this);
	this.model = File;
}

FileRepository.prototype = new Repository();

FileRepository.prototype.addFile = function(fileUrl, ownerId, toWhomallowed, callback) {
	var model = this.model;
	date = Date.now;
	var newFile = new model({url: fileUrl, owner: ownerId, createionDate: date, allowedTo:toWhomallowed });
	newFile.save(callback);
};

FileRepository.prototype.updateFile = function(fileId, fileUrl, ownerId, toWhomallowed, callback) {
	var model = this.model;
	var query = { _id: id };
	model.update(query, {url: fileUrl, owner: ownerId, createionDate: date, allowedTo:toWhomallowed }, {multi:false});
	
	var query = model.update({events:eventId}, {$pull: { events:  eventId }}, );
	query.exec(callback);
};

//getById from generalRepository
//deleteByID from generalRepository

module.exports = new FileRepository();