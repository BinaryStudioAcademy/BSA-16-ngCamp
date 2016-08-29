var Repository = require('./generalRepository'),
    Checkin = require('../schemas/checkinSchema');

function CheckinRepository() {
    Repository.prototype.constructor.call(this);
    this.model = Checkin;
}

CheckinRepository.prototype = new Repository();

CheckinRepository.prototype.findCheckinsByFrequency = findCheckinsByFrequency;

function findCheckinsByFrequency(freq, callback){
	var query = Checkin.find({frequency: freq}).populate('project');
	query.exec(callback);
}

module.exports = new CheckinRepository();
