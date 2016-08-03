var connection = require('../db/dbConnect');
var Repository = require('./generalRepository');
var Event = require('../schemas/eventSchema');

function EventRepository() {
    Repository.prototype.constructor.call(this);
    this.model = Event;
}

EventRepository.prototype = new Repository();

EventRepository.prototype.addEvent = addEvent;
EventRepository.prototype.updateEvent = updateEvent;
//===================================================================
function addEvent(event, callback) {
    var model = this.model;

    var newEvent = new model(event);

    newEvent.save(callback);
}
//===================================================================
function updateEvent(event, callback) {
    var model = this.model;

    var query = {
        _id: event.eventId
    };

    var document = {
        $set: event.data;
    };

    var options = {
        multi: false
    };

    model.update(query, document, options);
    query.exec(callback);
}

model.exports = new EventRepository();