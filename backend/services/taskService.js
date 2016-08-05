var taskRepository = require('../repositories/taskRepository');
var validationService = require('./validationService');

function TaskService() {}

TaskService.prototype.addEvent = addTask;
TaskService.prototype.updateEvent = updateTask;

//================================================================
function addTask(body, callback) {
    if (validationService.addEventValidation(body, callback)) {
        taskRepository.add(body, callback);
    };
}
//================================================================
function updateTask(body, callback) {
    if (validationService.validationBodyProperty(body, '_id', callback) &&
        validationService.validationBodyProperty(body, 'dataToUpdate', callback)) {
        taskRepository.setObjPropsById(body._id, body.dataToUpdate, callback);
    }
}

module.exports = new TaskService();