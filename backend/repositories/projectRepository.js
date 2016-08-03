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

function createProject(){

};

function getProject(){

};

function updateProject(){

};

function deleteProject(){

};


module.exports = new ProjectRepository();