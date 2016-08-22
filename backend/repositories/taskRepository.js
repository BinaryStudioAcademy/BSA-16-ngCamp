var Repository = require('./generalRepository');
var Task = require('../schemas/taskSchema');

function TaskRepository() {
    Repository.prototype.constructor.call(this);
    this.model = Task;
}

TaskRepository.prototype = new Repository();

TaskRepository.prototype.getAllTasksInProject = getAllTasksInProject;

module.exports = new TaskRepository();

function getAllTasksInProject(id,callback){
	var model = this.model;
	var query = model.find({
		project: id
	});
	query.exec(callback);
}