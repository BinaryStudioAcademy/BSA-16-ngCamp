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
ProjectService.prototype.addAdmins = addAdmins;
ProjectService.prototype.removeAdmins = removeAdmins;
ProjectService.prototype.getProjectsForCurrentUser = getProjectsForCurrentUser;
ProjectService.prototype.genPass = genPass;

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
    projectRepository.changeState(id, state, callback);
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

function addAdmins(id, body, callback) {
    if (validationService.manageProjectAdmins(body, callback)) {
        projectRepository.addAdmin(id, body, callback);
    }
}

function removeAdmins(id, body, callback) {
    if (validationService.manageProjectAdmins(body, callback)) {
        projectRepository.removeAdmin(id, body, callback);
    }
}

function genPass(pass, callback) {
    var key;
    if (pass == 0) {
        key = {
            isSettingsEdit: false,
            isReports: false,
            isCheckinEdit: false

        }
    } else {
        key = {
            isSettingsEdit: true,
            isReports: true,
            isCheckinEdit: true
        }
    }
    callback(key);
}

module.exports = new ProjectService();