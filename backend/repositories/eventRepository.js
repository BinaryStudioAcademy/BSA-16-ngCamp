var Repository = require('./generalRepository');
var Event = require('../schemas/eventSchema');

function EventRepository() {
    Repository.prototype.constructor.call(this);
    this.model = Event;
}

EventRepository.prototype = new Repository();

EventRepository.prototype.updateEvent = updateEvent;
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