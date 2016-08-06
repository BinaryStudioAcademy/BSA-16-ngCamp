var Repository = require('./generalRepository'),
    Checkin = require('../schemas/checkinSchema');

function CheckinRepository() {
    Repository.prototype.constructor.call(this);
    this.model = Checkin;
}

CheckinRepository.prototype = new Repository();

module.exports = new CheckinRepository();
