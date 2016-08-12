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

function updateItem(id, body, callback) {
    userRepository.setObjPropsById(id, body, callback);
}

module.exports = new UserService();
