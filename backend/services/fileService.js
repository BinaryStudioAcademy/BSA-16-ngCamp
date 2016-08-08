var fileRepository = require('../repositories/fileRepository');
var validationService = require('./validationService');

function FileService() {

}

FileService.prototype.addItem = addItem;
FileService.prototype.updateItem = updateItem;

function addItem(body, callback) {
    if (addFileValidation(body, callback)) {
        body.creationDate = Date();
        fileRepository.add(body, callback);
    }
}

function updateItem(id, body, callback) {
    fileRepository.setObjPropsById(id, body, callback);
}

function addFileValidation(body, callback) {
    if (!body.url) {
        callback({
            message: 'Url isn\'t defined'
        }, null);
        return false;
    }
    if (!body.allowedTo) {
        callback({
            message: 'allowedTo isn\'t defined'
        }, null);
        return false;
    }
    return true;
}

module.exports = new FileService();