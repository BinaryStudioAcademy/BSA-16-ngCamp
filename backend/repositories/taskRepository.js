var Repository = require('./generalRepository');
var Task = require('../schemas/taskSchema');

function TaskRepository() {
    Repository.prototype.constructor.call(this);
    this.model = Task;
}

TaskRepository.prototype = new Repository();

TaskRepository.prototype.getAllTasksInProject = getAllTasksInProject;
TaskRepository.prototype.addParticipant = addParticipant;
TaskRepository.prototype.removeParticipant = removeParticipant;

module.exports = new TaskRepository();

function getAllTasksInProject(id,callback){
	var model = this.model;
	var query = model.find({
		project: id
	}).populate({
		path: "toDos"
	}).populate({
		path: "participants"
	}).populate({
		path: "author"
	});
	query.exec(callback);
}

function addParticipant(id, participantId, callback){
	var model = this.model;
	var query = model.update(
		{_id: id},
		{$addToSet: 
			{participants: participantId} 
		});
	query.exec(callback);
}

function removeParticipant(id,participantId,callback){
	var model = this.model;
	var query = model.update(
		{_id: id},
		{$pull: {participants: participantId}
		});
	query.exec(callback);
}
