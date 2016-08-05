var messageRepository = require('../repositories/messageRepository');
var validationService = require('./validationService');

function MessageService() {

}

MessageService.prototype.addItem = addItem;
MessageService.prototype.updateItem = updateItem;

function addItem(body, callback) {
    if (validationService.MessageValidation(body, callback)) {
        messageRepository.add(body, callback);
    }
}

function updateItem(id, body, callback) {
    if (validationService.MessageValidation(body, callback)) {
        messageRepository.setObjPropsById(id, body, callback);
    }
}

module.exports = new MessageService();
