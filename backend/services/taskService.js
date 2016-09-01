var taskRepository = require('../repositories/taskRepository');
var validationService = require('./validationService');
var toDoService = require('./toDoService');


function TaskService() {}


TaskService.prototype.addItem = addItem;
TaskService.prototype.updateTask = updateTask;
TaskService.prototype.addTaskParticipant = addTaskParticipant;
TaskService.prototype.removeTaskParticipant = removeTaskParticipant;


//================================================================ 
function addItem(body, callback) {
	var toDos = body.toDos;
	delete body.toDos;
	if (validationService.addTaskValidation(body, callback)) {
		body.dateCreated = Date();
		taskRepository.add(body, function(taskErr,taskData){
			if(taskData){
				toDos.forEach(function(elem){
					elem.task = taskData._id;
				});
				toDoService.addBatch(toDos,function(toDoErr,toDoData){
					if(toDoData){
						console.log(toDoData);
						var toDoIdList = toDoData.map(function(elem){
							return elem._id
						});
						taskRepository.setObjPropsById(taskData._id,{toDos: toDoIdList},callback);
					}else{
						callback(toDoErr);
					}
				});
			}else{
				callback(taskErr);
			}

		});
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