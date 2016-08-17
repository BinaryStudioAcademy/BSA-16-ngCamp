var eventRepository = require('../repositories/eventRepository');
var validationService = require('./validationService');

function EventService() {}

EventService.prototype.addItem = addItem;
EventService.prototype.updateEvent = updateEvent;
EventService.prototype.getByDate = getByDate;
EventService.prototype.getParticipants = getParticipants;
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
    if (eventsDateValidation(startDate, endDate)) {
        eventRepository.getByDate(startDate, endDate, callback);
    }
}

function getParticipants(id, callback) {
    if (id) {
        eventRepository.getParticipants(id, callback);
    }
}

function getFiles(id, callback) {
    if (id) {
        eventRepository.getFiles(id, callback);
    }
}

module.exports = new EventService();