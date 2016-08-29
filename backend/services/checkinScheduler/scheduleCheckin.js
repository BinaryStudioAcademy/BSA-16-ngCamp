var sendEmailToCheckinPartisipants = require('./sendEmail');
var repo = require('../../repositories/checkinRepository');

function scheduleCheckinsByFrequency(frequency){
	repo.findCheckinsByFrequency(frequency, function(err, checkins){
	    checkins.forEach(function(checkin){
		 	var date = Date.now();
			var answers = [];
			var question = checkin.question;
			var projectName = checkin.project.title;
			checkin.participants.forEach(function(p){
				sendEmailToCheckinPartisipants(p, question, projectName);
				checkin.answers.push({user: p, answer: 'noAnswer', creationDate: date});
			});
			checkin.save(function(err, result){
				if(err){
					console.log(err);
				} else {
					// console.log(result);
				}
			});
			
		})
	});
}

module.exports = scheduleCheckinsByFrequency