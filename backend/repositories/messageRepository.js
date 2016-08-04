var Repository = require('./generalRepository');
var Message = require('../schemas/messageSchema');

MessageRepository.prototype = new Repository();

MessageRepository.prototype.createMessage = createMessage;
MessageRepository.prototype.updateMessage = updateMessage;

function MessageRepository() {
	Repository.prototype.constructor.call(this);
	this.model = Message;
};

function createMessage(dataObj, callback){
    var model = this.model;
    var newMessage = new model({
        title: dataObj.messageTitle,
        description: dataObj.messageDescription,
        author: dataObj.messageAuthor,
        project: dataObj.messageProject,
        date: Date.now(),
        comments: dataObj.messageComments,
        files: dataObj.messageFiles
    });
	newMessage.save(callback);
};

//we have getById function inherited from generalRepository

function updateMessage(dataObj, callback){
    var model = this.model;
    var query = {_id: messageId};
    model.update(query, {
        title: dataObj.messageTitle,
        description: dataObj.messageDescription,
        author: dataObj.messageAuthor,
        project: dataObj.messageProject,
        date: Date.now(),
        comments: dataObj.messageComments,
        files: dataObj.messageFiles
    },{multi:false});
    query.exec(callback);
};
//we have deleteById function inherited from generalRepository

module.exports = new MessageRepository();