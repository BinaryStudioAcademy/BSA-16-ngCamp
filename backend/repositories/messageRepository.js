var Repository = require('./generalRepository');
var Message = require('../schemas/messageSchema');

MessageRepository.prototype = new Repository();

MessageRepository.prototype.createMessage = createMessage;

function MessageRepository() {
    Repository.prototype.constructor.call(this);
    this.model = Message;
};

function createMessage(data, callback) {
    var model = this.model;
    var newMessage = new model(data);
    newMessage.save(callback);
};

module.exports = new MessageRepository();