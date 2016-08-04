var Repository = require('./generalRepository');
var Message = require('../schemas/messageSchema');

MessageRepository.prototype = new Repository();

MessageRepository.prototype.updateMessageById = updateMessageById;
MessageRepository.prototype.createMessage = createMessage;

function MessageRepository() {
	Repository.prototype.constructor.call(this);
	this.model = Message;
};

function createMessage(data, callback){
    var model = this.model;
    var newMessage = new model(data);
	newMessage.save(callback);
};

function updateMessageById(id, data, callback){
    var model = this.model;
    var query = model.update({_id: id}, data);
    query.exec(callback);
}

module.exports = new MessageRepository();