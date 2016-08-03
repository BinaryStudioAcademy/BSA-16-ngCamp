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

/**
 * [[Add event to DB]]
 * @param {[[String]]} title
 * @param {[[String]]} description
 * @param {[[ObjectId]]} projectId
 * @param {[[Boolean]]} isAllDay
 * @param {[[Date]]} startDate
 * @param {[[Date]]} endDate
 * @param {[[[ObjectId]]]} partisipants
 * @param {[[[ObjectId]]]} files
 * @param {[[Function]]} callback 
 */
function addEvent(title, description, projectId, isAllDay, startDate, endDate, partisipants, files, callback) {
    var model = this.model;

    var event = {
        title: title,
        description: description,
        project: projectId,
        isAllDay: isAllDay,
        startDate: startDate,
        endDate: endDate,
        participants: partisipants,
        files: files
    };

    var newEvent = new model(event);

    newEvent.save(callback);
}
//===================================================================
/**
 * [[Update event in DB]]
 * @param {[[ObjectId]]} eventId
 * @param {[[String]]} title
 * @param {[[String]]} description
 * @param {[[ObjectId]]} projectId
 * @param {[[Boolean]]} isAllDay
 * @param {[[Date]]} startDate
 * @param {[[Date]]} endDate
 * @param {[[[ObjectId]]]} partisipants
 * @param {[[[ObjectId]]]} files
 * @param {[[Function]]} callback 
 */
function updateEvent(eventId, title, description, projectId, isAllDay, startDate, endDate, partisipants, files, callback) {
    var model = this.model;

    var query = {
        _id: eventId
    };

    var updatedEvent = {
        $set: {
            title: title,
            description: description,
            project: projectId,
            isAllDay: isAllDay,
            startDate: startDate,
            endDate: endDate,
            participants: partisipants,
            files: files
        }
    };

    var options = {
        multi: false
    };

    model.update(query, updatedEvent, options);
    query.exec(callback);
}

model.exports = new EventRepository();