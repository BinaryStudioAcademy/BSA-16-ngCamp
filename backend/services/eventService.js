var eventRepository = require('../repositories/eventRepository');
var validationService = require('./validationService');

function EventService() {}

EventService.prototype.addEvent = addEvent;
EventService.prototype.updateEvent = updateEvent;

//================================================================
function addEvent(body, callback) {
    if (validationService.addEventValidation(body, callback)) {
        eventRepository.add(body, callback);
    };
}
//================================================================
function updateEvent(body, callback) {
    if (validationService.validationBodyProperty(body, '_id', callback) &&
        validationService.validationBodyProperty(body, 'dataToUpdate', callback)) {
        eventRepository.setObjPropsById(body._id, body.dataToUpdate, callback);
    }
}

module.exports = new EventService();