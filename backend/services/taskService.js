var taskRepository = require('../repositories/taskRepository');
var validationService = require('./validationService');


function TaskService() {}


TaskService.prototype.addTask = addTask;
TaskService.prototype.updateTask = updateTask;


//================================================================ 
function addTask(body, callback) {
    if (validationService.addTaskValidation(body, callback)) {
        body.dateCreated = Date();
        taskRepository.add(body, callback);
    };
}
//================================================================ 
function updateTask(id, body, callback) {

    taskRepository.setObjPropsById(id, body, callback);

}


module.exports = new TaskService();