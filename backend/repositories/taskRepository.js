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
TaskRepository.prototype.getPopulatedTask = getPopulatedTask;
TaskRepository.prototype.addToDo = addToDo;
TaskRepository.prototype.removeToDo = removeToDo;
TaskRepository.prototype.getByIdWithComments = getByIdWithComments;
TaskRepository.prototype.addComment = addComment;

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
	}).populate({
		path: "files"
	}).populate({
        path:'comments.author',
    });
	query.exec(callback);
}

function getPopulatedTask(id,callback){
	var model = this.model;
	var query = model.findOne({
		_id: id
	}).populate({
		path: "toDos"
	}).populate({
		path: "participants"
	}).populate({
		path: "files"
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

function addToDo(id,toDoId, callback){
	var model = this.model;
	var query = model.update(
		{_id: id},
		{$push: {toDos: toDoId}}
	);
	query.exec(callback);
}

function removeToDo(id,toDoId, callback){
	var model = this.model;
	var query = model.update(
		{_id: id},
		{$pull: {toDos: toDoId}}
	);
	query.exec(callback);
}

function getByIdWithComments(id, callback) {
    var model = this.model;
    var query = model.findOne({
        _id: id,
    }).populate({
        path:'comments.author',
    });
    query.exec(callback);
}

function addComment(id, data, callback){
    var model = this.model;
    var query = model.update({
        _id: id
    },{
        $push: {
            comments: {
                $each: data
            }
        }
    });
    query.exec(callback);
}