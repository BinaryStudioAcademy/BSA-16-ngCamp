var Repository = require('./generalRepository');
var Message = require('../schemas/messageSchema');

MessageRepository.prototype = new Repository();

MessageRepository.prototype.createMessage = createMessage;
MessageRepository.prototype.getMessage = getMessage;
MessageRepository.prototype.updateMessage = updateMessage;
MessageRepository.prototype.deleteMessage = deleteMessage;

function MessageRepository() {
	Repository.prototype.constructor.call(this);
	this.model = Message;
};

function createMessage(messageTitle, messageDescription, messageAuthor, messageProject, messageComments, messageFiles, callback){
    var model = this.model;
    var newMessage = new model({
        title: messageTitle,
        description: messageDescription,
        author: messageAuthor,
        project: messageProject,
        date: Date.now(),
        comments: messageComments,
        files: messageFiles
    });
	newMessage.save(callback);
};

function getMessage(messageId, callback){
    var model = this.model;
    var query = model.find({_id: messageId});
	query.exec(callback);
};

function updateMessage(messageId, messageTitle, messageDescription, messageAuthor, messageProject, messageComments, messageFiles, callback){
    var model = this.model;
    var query = {_id: messageId};
    model.update(query, {
        title: messageTitle,
        description: messageDescription,
        author: messageAuthor,
        project: messageProject,
        date: Date.now(),
        comments: messageComments,
        files: messageFiles
    },{multi:false});
    query.exec(callback);
};

function deleteMessage(messageId, callback){
    var model = this.model;
    var query = model.remove({
		_id: messageId
	});
	query.exec(callback);
};

module.exports = new ProjectRepository();