var Repository = require('./generalRepository');
var Event = require('../schemas/eventSchema');

function EventRepository() {
    Repository.prototype.constructor.call(this);
    this.model = Event;
}

EventRepository.prototype = new Repository();

module.exports = new EventRepository();