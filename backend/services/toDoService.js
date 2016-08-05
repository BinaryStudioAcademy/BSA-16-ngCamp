var toDoRepository = require('../repositories/toDoRepository');
var validationService = require('./validationService');

function ToDoService() {}

ToDoService.prototype.addToDo = addToDo;
ToDoService.prototype.updateToDo = updateToDo;

//================================================================
function addToDo(body, callback) {
    if (validationService.addToDoValidation(body, callback)) {
        toDoRepository.add(body, callback);
    };
}
//================================================================
function updateToDo(body, callback) {
    if (validationService.validationBodyProperty(body, '_id', callback) &&
        validationService.validationBodyProperty(body, 'dataToUpdate', callback)) {
        toDoRepository.setObjPropsById(body._id, body.dataToUpdate, callback);
    }
}

module.exports = new ToDoService();