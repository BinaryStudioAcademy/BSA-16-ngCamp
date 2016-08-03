var Repository = require('./generalRepository');
var Message = require('../schemas/messageSchema');

MessageRepository.prototype = new Repository();

MessageRepository.prototype.some = some;


function MessageRepository() {
	Repository.prototype.constructor.call(this);
	this.model = Message;
};

module.exports = new ProjectRepository();