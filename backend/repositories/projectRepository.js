var Repository = require('./generalRepository');
var Project = require('../schemas/projectRepository');

ProjectRepository.prototype = new Repository();

ProjectRepository.prototype.createProject = createProject;
ProjectRepository.prototype.getProject = getProject;
ProjectRepository.prototype.updateProject = updateProject;
ProjectRepository.prototype.deleteProject = deleteProject;

function ProjectRepository() {
	Repository.prototype.constructor.call(this);
	this.model = Project;
};

function createProject(projectTitle, projectDescription, participantsArr, projectSDate, projectEDate, projectVersion, projectRepository, callback){
    var model = this.model;

    var newProject = new model({
        title: projectTitle,
        description: projectDescription,
        participants: participantsArr,
        startDate: projectSDate,
        endDate: projectEDate,
        version: projectVersion,
        repository: projectRepository
    });
	newProject.save(callback);
};

function getProject(projectId, callback){
    var model = this.model;
    var query = model.find({_id: projectId});
	query.exec(callback);
};

function updateProject(projectId, projectTitle, projectDescription, participantsArr, projectSDate, projectEDate, projectVersion, projectRepository, callback){
    var model = this.model;
    var query = {_id: projectId}
    model.update(query, {
        title: projectTitle,
        description: projectDescription,
        participants: participantsArr,
        startDate: projectSDate,
        endDate: projectEDate,
        version: projectVersion,
        repository: projectRepository
    },{multi:false});
    query.exec(callback);
};

function deleteProject(projectId, callback){
    var model = this.model;
    var query = model.remove({
		_id: projectId
	});
	query.exec(callback);
};


module.exports = new ProjectRepository();