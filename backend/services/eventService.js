var eventRepository = require('../repositories/eventRepository');
var validationService = require('./validationService');

function EventService() {}

EventService.prototype.addItem = addItem;
EventService.prototype.updateEvent = updateEvent;
EventService.prototype.getByDate = getByDate;
EventService.prototype.getParticipants = getParticipants;
EventService.prototype.setParticipants = setParticipants;
EventService.prototype.setFiles = setFiles;
EventService.prototype.getFiles = getFiles;

//================================================================
function addItem(body, callback) {
    if (validationService.addEventValidation(body, callback)) {
        eventRepository.add(body, callback);
    };
}
//================================================================
function updateEvent(id, body, callback) {
    eventRepository.setObjPropsById(id, body, callback);
}

function getByDate(startDate, endDate, callback) {
    if (validationService.eventsDateValidation(startDate, endDate, callback)) {
        eventRepository.getByDate(startDate, endDate, callback);
    }
}

function getParticipants(id, callback) {
    if (id) {
        eventRepository.getParticipants(id, callback);
    }
}

function setParticipants(id, body, callback) {
    if (validationService.manageArrayInput(body, callback)) {
        eventRepository.setParticipants(id, body, callback);
    }
}

function getFiles(id, callback) {
    if (id) {
        eventRepository.getFiles(id, callback);
    }
}

function setFiles(id, body, callback) {
    if (validationService.manageArrayInput(body, callback)) {
        eventRepository.setFiles(id, body, callback);
    }
}

module.exports = new EventService();