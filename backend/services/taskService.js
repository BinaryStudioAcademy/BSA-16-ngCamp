var taskRepository = require('../repositories/taskRepository');
var validationService = require('./validationService');
var toDoService = require('./toDoService');


function TaskService() {}


TaskService.prototype.addItem = addItem;
TaskService.prototype.updateTask = updateTask;
TaskService.prototype.addTaskParticipant = addTaskParticipant;
TaskService.prototype.removeTaskParticipant = removeTaskParticipant;
TaskService.prototype.deleteTask = deleteTask;


//================================================================ 
function addItem(body, callback) {
	var toDos = body.toDos;
	delete body.toDos;
	if (validationService.addTaskValidation(body, callback)) {
		body.dateCreated = Date();
		taskRepository.add(body, function(taskErr,taskData){
			if(taskData && toDos.length){
				toDos.forEach(function(elem){
					elem.task = taskData._id;
				});
				toDoService.addBatch(toDos,function(toDoErr,toDoData){
					if(toDoData){
						var toDoIdList = toDoData.map(function(elem){
							return elem._id
						});
						taskRepository.setObjPropsById(taskData._id,{toDos: toDoIdList},function(setToDoListErr,setToDoListData){
							if(setToDoListErr){
								callback({message: 'toDos list update error'});
							}else{
								callback(undefined,{ok: 1});
							};
						});
					}else{
						callback(toDoErr);
					}
				});
			}else if(taskErr){
				callback(taskErr);
			}else if(!toDos.length){
				callback(undefined,{ok: 1});
			};

		});
	};
}
//================================================================ 
function updateTask(id, body, callback) {
	var toDos = body.toDos || [];
	var taskIsFinished = true;
	delete body.toDos;
	if(validationService.addTaskValidation(body,callback)){
		taskRepository.setObjPropsById(id, body, function(taskUpdateErr, taskUpdateData){
			if(taskUpdateData){
				if (!toDos.length){
					callback(undefined,{ok: 1});
				};
				toDos.forEach(function(todo,index,array){
					if(todo._id){
						if(todo.status === 'removed'){
							toDoService.deleteToDo(todo._id, function(deleteToDoError,deleteToDoData){
								if(deleteToDoError){
									callback(deleteToDoError);
								}else{
									taskRepository.removeToDo(id, todo._id ,function(pullTDerr,pullTDdata){
										if(pullTDerr){
											callback(pullTDerr);
										} else if (index === array.length - 1){ 
											taskRepository.setObjPropsById(id, {isFinished: taskIsFinished}, function(taskIsFinErr, taskIsFinData){
												if(taskIsFinErr){
													callback(taskIsFinErr);
												}else{
													callback(undefined,{ok: 1});
												};
											});
										};
								});
								};
							});
						}else{
							toDoService.updateToDo(todo._id, todo, function(updateToDoError, updateToDoData){
								taskIsFinished = (todo.status === "uncomplete") ? false : taskIsFinished;
								if(updateToDoError){
									callback(updateToDoError);
								}else if(index === array.length - 1){ 
									taskRepository.setObjPropsById(id, {isFinished: taskIsFinished}, function(taskIsFinErr, taskIsFinData){
										if(taskIsFinErr){
											callback(taskIsFinErr);
										}else{
											callback(undefined,{ok: 1});
										};
									});
								};
							});
						};
					}else{
						todo.task = body._id;
						toDoService.addItem(todo, function(addToDoErr,addToDoData){
							taskIsFinished = false;
							if(addToDoErr){
								callback(addToDoErr);
							}else{
								taskRepository.addToDo(id, addToDoData._id,function(pushTDerr,pushTDdata){
										if(pushTDerr){
											callback({message: 'ToDo update error'});
										} else if(index === array.length - 1){ 
											taskRepository.setObjPropsById(id, {isFinished: taskIsFinished}, function(taskIsFinErr, taskIsFinData){
												if(taskIsFinErr){
													callback(taskIsFinErr);
												}else{
													callback(undefined,{ok: 1});
												};
											});
										};
								});
							};
						});
					};
				});
			}else{
				callback({message: 'Task Update Error'});
			};
		});
	};
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

function deleteTask(id,callback){
	taskRepository.getById(id, function(getTaskError,getTaskData){
		getTaskData.toDos.forEach(function(element){
			toDoService.deleteToDo(element,function(deleteToDoErr){
				if(deleteToDoErr){
					callback(deleteToDoErr);
				};
			});
		});
		taskRepository.deleteById(id, callback);
	});
}



module.exports = new TaskService();