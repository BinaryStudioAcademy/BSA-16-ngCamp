var projectRepository = require('../repositories/projectRepository');
var validationService = require('./validationService');

function ProjectService(){}

ProjectService.prototype.addItem = addItem;
ProjectService.prototype.updateItem = updateItem;


function addItem(body, callback) {
    console.log(body);
    if (validationService.ProjectValidation(body, callback)) {
        projectRepository.add(body, callback);
    }
}

function updateItem(id, body, callback) {
    if(validationService.ProjectValidation(body, callback)){
        projectRepository.updateProjectById(id, body, callback);
    }
}

module.exports = new ProjectService();


