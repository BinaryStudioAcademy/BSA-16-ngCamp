var fileRepository = require('../repositories/fileRepository');
var validationService = require('./validationService');

function FileService() {

}

FileService.prototype.addItem = addItem;
FileService.prototype.updateItem = updateItem;

function addItem(body, callback) {
    if (addFileValidation(body, callback)) {
        fileRepository.add(body, callback);
    }
}

function updateItem(body, callback) {
    if (validationService.validationBodyProperty(body, '_id', callback) &&
        validationService.validationBodyProperty(body, 'dataToUpdate', callback)) {
        fileRepository.setObjPropsById(body._id, body.dataToUpdate, callback);
    }
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