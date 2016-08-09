var toDoRepository = require('../repositories/toDoRepository');
var validationService = require('./validationService');


function ToDoService() {}


ToDoService.prototype.addItem = addItem;
ToDoService.prototype.updateToDo = updateToDo;


//================================================================ 
function addItem(body, callback) {
    if (validationService.addToDoValidation(body, callback)) {
        body.dateCreated = Date();
        toDoRepository.add(body, callback);
    };
}
//================================================================ 
function updateToDo(id, body, callback) {
    if (validationService.addToDoValidation(body, callback)) {
        toDoRepository.setObjPropsById(id, body, callback);
    }
}


module.exports = new ToDoService();