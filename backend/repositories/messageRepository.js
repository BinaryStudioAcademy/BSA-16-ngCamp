var Repository = require('./generalRepository');
var Message = require('../schemas/messageSchema');

MessageRepository.prototype = new Repository();
MessageRepository.prototype.getMessagesWithAuthors = getMessagesWithAuthors;

function MessageRepository() {
    Repository.prototype.constructor.call(this);
    this.model = Message;
};

function getMessagesWithAuthors(callback){
	var model = this.model;
	var query = model.find().populate('author');
	query.exec(callback);
}

module.exports = new MessageRepository();