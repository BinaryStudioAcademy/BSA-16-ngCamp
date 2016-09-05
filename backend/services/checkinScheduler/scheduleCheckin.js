var sendEmailToCheckinPartisipants = require('./sendEmail');
var repo = require('../../repositories/checkinRepository');
var getToken = require('./generateToken');


function scheduleCheckinsByFrequency(frequency, time){
    repo.findCheckinsByFrequencyAndTime(frequency,time, function(err, checkins){
        checkins.forEach(function(checkin){
                var date = Date.now();
                var answers = [];
                var question = checkin.question;
                var projectName = checkin.project.title;                   
                if (checkin.participants.length > 0) {
                    checkin.participants.forEach(function (p) {
                        var token = getToken();
                        //console.log(p);
                        sendEmailToCheckinPartisipants(p, question, projectName, token);
                        checkin.answers.push({ user: p, answer: 'noAnswer', creationDate: date, token: token });
                    });
                    checkin.save(function (err, result) {
                        if (err) {
                            console.log(err);
                        } else {
                            //console.log(result);
                        }
                    });
                }
                //console.log(checkin.project[0]);
        })
    });
}

module.exports = scheduleCheckinsByFrequency