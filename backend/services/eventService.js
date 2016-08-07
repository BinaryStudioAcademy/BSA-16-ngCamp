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
function updateEvent(id, body, callback) {

    eventRepository.setObjPropsById(id, body, callback);

}

module.exports = new EventService();