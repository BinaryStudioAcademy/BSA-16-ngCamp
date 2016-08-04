var userRepository = require('../repositories/userRepository');
var validationService = require('./validationService');

function UserService() {

}

UserService.prototype.addItem = addItem;
UserService.prototype.updateItem = updateItem;

function addItem(body, callback) {
    if (validationService.addUserValidation(body, callback)) {
        userRepository.add(body, callback);
    }    
}

function updateItem(body, callback) {
    if (validationService.validationBodyProperty(body, '_id', callback) &&
            validationService.validationBodyProperty(body, 'dataToUpdate', callback)) {
        userRepository.setObjPropsById(body._id, body.dataToUpdate, callback);
    }
}

module.exports = new UserService();
