var projectRepository = require('../repositories/projectRepository');
var validationService = require('./validationService');

function ProjectService() {}

ProjectService.prototype.addItem = addItem;
ProjectService.prototype.updateItem = updateItem;
ProjectService.prototype.deleteItem = deleteItem;
ProjectService.prototype.addParticipants = addParticipants;
ProjectService.prototype.removeParticipants = removeParticipants;

function addItem(body, callback) {
    if (validationService.ProjectValidation(body, callback)) {
        projectRepository.add(body, callback);
    }
}

function updateItem(id, body, callback) {
    projectRepository.setObjPropsById(id, body, callback);
}

function deleteItem(id, callback) {
    var project = projectRepository.getById(id, function(err, project) {
        if (project) {
            project.remove(callback);
        }
    });
}

function addParticipants(id, body, callback) {
    if (validationService.manageProjectParticipants(body, callback)) {
        projectRepository.addParticipants(id, body, callback);
    }
}

function removeParticipants(id, body, callback) {
    if (validationService.manageProjectParticipants(body, callback)) {
        projectRepository.removeParticipants(id, body, callback);
    }
}

module.exports = new ProjectService();