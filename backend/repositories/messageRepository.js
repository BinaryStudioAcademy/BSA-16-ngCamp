var Repository = require('./generalRepository');
var Message = require('../schemas/messageSchema');

MessageRepository.prototype = new Repository();

function MessageRepository() {
    Repository.prototype.constructor.call(this);
    this.model = Message;
};


module.exports = new MessageRepository();