var taskRepository = require('../repositories/taskRepository');
var validationService = require('./validationService');


function TaskService() {}


TaskService.prototype.addItem = addItem;
TaskService.prototype.updateTask = updateTask;
TaskService.prototype.addTaskParticipant = addTaskParticipant;
TaskService.prototype.removeTaskParticipant = removeTaskParticipant;


//================================================================ 
function addItem(body, callback) {
    if (validationService.addTaskValidation(body, callback)) {
        body.dateCreated = Date();
        taskRepository.add(body, callback);
    };
}
//================================================================ 
function updateTask(id, body, callback) {
    taskRepository.setObjPropsById(id, body, callback);
}
//================================================================ 
function addTaskParticipant(id,participantId,callback) {
	if( validationService.TaskParticipantValidation( participantId, callback)){
	taskRepository.addParticipant(id, participantId, callback);
	};
}

function removeTaskParticipant(id,participantId,callback) {
	if( validationService.TaskParticipantValidation( participantId, callback)){
	taskRepository.removeParticipant(id, participantId, callback);
	};
}


module.exports = new TaskService();