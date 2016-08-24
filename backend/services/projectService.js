var projectRepository = require('../repositories/projectRepository');
var userRepository = require('../repositories/userRepository');
var validationService = require('./validationService');
var projectSchema = require('../schemas/projectSchema');
function ProjectService() {}

ProjectService.prototype.addItem = addItem;
ProjectService.prototype.updateItem = updateItem;
ProjectService.prototype.deleteItem = deleteItem;
ProjectService.prototype.addParticipants = addParticipants;
ProjectService.prototype.removeParticipants = removeParticipants;
ProjectService.prototype.getProjectsForCurrentUser = getProjectsForCurrentUser;

function addItem(body, callback) {
    if (validationService.ProjectValidation(body, callback)) {
        projectRepository.add(body, callback);
    }
}

function updateItem(id, body, callback) {
    projectRepository.setObjPropsById(id, body, callback);
}


function getProjectsForCurrentUser(userId, callback) {
    projectRepository.getProjectsByParticipantId(userId, callback);
}


function deleteItem(id, callback) {
    var state = "deleted";
    userRepository.removeProjectfromUser(id);
    projectRepository.changeState(id , state, callback);
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