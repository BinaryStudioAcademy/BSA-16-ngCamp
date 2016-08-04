var Repository = require('./generalRepository');
var Project = require('../schemas/projectSchema');

ProjectRepository.prototype = new Repository();

ProjectRepository.prototype.createProject = createProject;
ProjectRepository.prototype.updateProject = updateProject;

function ProjectRepository() {
	Repository.prototype.constructor.call(this);
	this.model = Project;
};

function createProject(dataObj, callback){
    var model = this.model;

    var newProject = new model({
        title: dataObj.projectTitle,
        description: dataObj.projectDescription,
        participants: dataObj.participantsArr,
        startDate: dataObj.projectSDate,
        endDate: dataObj.projectEDate,
        version: dataObj.projectVersion,
        repository: dataObj.projectRepository
    });
	newProject.save(callback);
};

//we have getById function inherited from generalRepository

function updateProject(dataObj, callback){
    var model = this.model;
    var query = {_id: dataObj.projectId};
    model.update(query, {
        title: dataObj.projectTitle,
        description: dataObj.projectDescription,
        participants: dataObj.participantsArr,
        startDate: dataObj.projectSDate,
        endDate: dataObj.projectEDate,
        version: dataObj.projectVersion,
        repository: dataObj.projectRepository
    },{multi:false});
    query.exec(callback);
};

//we have deleteById function inherited from generalRepository

module.exports = new ProjectRepository();