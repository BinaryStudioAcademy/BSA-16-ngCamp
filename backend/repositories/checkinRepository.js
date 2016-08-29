var Repository = require('./generalRepository'),
    Checkin = require('../schemas/checkinSchema');

function CheckinRepository() {
    Repository.prototype.constructor.call(this);
    this.model = Checkin;
}

CheckinRepository.prototype = new Repository();


CheckinRepository.prototype.findCheckinsByFrequencyAndTime = findCheckinsByFrequencyAndTime;
CheckinRepository.prototype.getAll = getAll;

function getAll(callback) {
    var query = Checkin.find({}).populate('participants');
    query.exec(callback);
}


function findCheckinsByFrequencyAndTime(freq, time, callback){
	var query = Checkin.find({frequency: freq, time: time}).populate('project');
	query.exec(callback);
}

module.exports = new CheckinRepository();
