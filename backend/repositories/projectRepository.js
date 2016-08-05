var Repository = require('./generalRepository');
var Project = require('../schemas/projectSchema');

ProjectRepository.prototype = new Repository();

function ProjectRepository() {
    Repository.prototype.constructor.call(this);
    this.model = Project;
};

module.exports = new ProjectRepository();