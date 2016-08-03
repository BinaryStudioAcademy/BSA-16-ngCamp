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

function addEvent(event, callback) {
    var model = this.model;

    var document = {
        title: event.title,
        description: event.description,
        project: event.projectId,
        isAllDay: event.isAllDay,
        startDate: event.startDate,
        endDate: event.endDate,
        participants: event.partisipants,
        files: event.files
    };

    var newEvent = new model(document);

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