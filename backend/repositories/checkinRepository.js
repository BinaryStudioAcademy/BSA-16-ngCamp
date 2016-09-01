var Repository = require('./generalRepository'),
    Checkin = require('../schemas/checkinSchema');

function CheckinRepository() {
    Repository.prototype.constructor.call(this);
    this.model = Checkin;
}

CheckinRepository.prototype = new Repository();


CheckinRepository.prototype.findCheckinsByFrequencyAndTime = findCheckinsByFrequencyAndTime;
CheckinRepository.prototype.getAll = getAll;
CheckinRepository.prototype.getByIdWithParticipants = getByIdWithParticipants;


function getByIdWithParticipants(id, callback){
	var query = Checkin.findOne({
		_id: id
	})
	.populate('participants')
	.populate('answers.user').sort({'answers.creationDate': -1});
	// .populate('answers.user');
    query.exec(callback);
}

function getAll(callback) {
    var query = Checkin.find({}).populate('participants');
    query.exec(callback);
}


function findCheckinsByFrequencyAndTime(freq, time, callback){
	var query = Checkin.find({
		frequency: freq, 
		time: time
	}).populate('project');
	query.exec(callback);
}

module.exports = new CheckinRepository();
