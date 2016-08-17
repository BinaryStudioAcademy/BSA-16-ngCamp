var Repository = require('./generalRepository');
var Event = require('../schemas/eventSchema');

function EventRepository() {
    Repository.prototype.constructor.call(this);
    this.model = Event;
}

EventRepository.prototype = new Repository();
EventRepository.prototype.getByDate = getByDate;
EventRepository.prototype.getParticipants = getParticipants;
EventRepository.prototype.getFiles = getFiles;

function getByDate(startDate, endDate, callback) {
    var model = this.model;
    var query = model.find({
        startDate: {
            $gte: startDate
        },
        endDate: {
            $lte: endDate
        }
    }, {
        title: 1,
        description: 1,
        project: 1,
        startDate: 1,
        endDate: 1
    });
    query.exec(callback);
}

function getParticipants(id, callback) {
    var model = this.model;
    var query = model.findOne({
        _id: id
    }).populate("participants");
    query.exec(callback);
}

function getFiles(id, callback) {
    var model = this.model;
    var query = model.findOne({
        _id: id
    }).populate("files");
    query.exec(callback);
}

module.exports = new EventRepository();