var Repository = require('./generalRepository');
var Project = require('../schemas/projectSchema');

ProjectRepository.prototype = new Repository();

ProjectRepository.prototype.updateProjectById = updateProjectById;

function ProjectRepository() {
	Repository.prototype.constructor.call(this);
	this.model = Project;
};

function updateProjectById(id, data, callback){
    var model = this.model;
    var query = model.update({_id: id}, data);
    query.exec(callback);
}

module.exports = new ProjectRepository();