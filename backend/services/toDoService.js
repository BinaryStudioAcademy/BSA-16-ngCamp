var toDoRepository = require('../repositories/toDoRepository');
var validationService = require('./validationService');


function ToDoService() {}


ToDoService.prototype.addToDo = addToDo;
ToDoService.prototype.updateToDo = updateToDo;


//================================================================ 
function addToDo(body, callback) {
    if (validationService.addToDoValidation(body, callback)) {
        body.dateCreated = Date();
        toDoRepository.add(body, callback);
    };
}
//================================================================ 
function updateToDo(id, body, callback) {

    toDoRepository.setObjPropsById(id, body, callback);

}


module.exports = new ToDoService();