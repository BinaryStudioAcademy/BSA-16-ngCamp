var Repository = require('./generalRepository'),
    Checkin = require('../schemas/checkinSchema');
    User = require('../schemas/checkinSchema');

function CheckinRepository() {
    Repository.prototype.constructor.call(this);
    this.model = Checkin;
}

CheckinRepository.prototype = new Repository();


CheckinRepository.prototype.findCheckinsByFrequencyAndTime = findCheckinsByFrequencyAndTime;
CheckinRepository.prototype.getAll = getAll;
CheckinRepository.prototype.getByIdWithParticipants = getByIdWithParticipants;
CheckinRepository.prototype.getByAnswerToken = getByAnswerToken;
CheckinRepository.prototype.updateAnswerItem = updateAnswerItem;
CheckinRepository.prototype.getAnswersById = getAnswersById;
CheckinRepository.prototype.findCheckinsByFrequency = findCheckinsByFrequency;
CheckinRepository.prototype.findCheckinsByAnswerDate = findCheckinsByAnswerDate;
CheckinRepository.prototype.getQuestionsByProject = getQuestionsByProject;



function getByIdWithParticipants(id, callback) {
    var query = Checkin.findOne({
            _id: id
        })
        .populate('participants')
        .populate('answers.user')
        .sort({
            'answers.creationDate': -1
        });
    query.exec(callback);
}



function getByAnswerToken(token, callback) {
    var query = Checkin.findOne()
        .elemMatch("answers", {
            token: token
        })
        .populate('answers');
    query.exec(callback);
}

function getAll(callback) {
    var query = Checkin.find({})
        .populate('participants');
    query.exec(callback);
}


function findCheckinsByFrequencyAndTime(freq, time, callback) {
    var query = Checkin.find({
        frequency: freq,
        time: time
    }).populate('project');
    query.exec(callback);
}
// not for mainpage
function findCheckinsByFrequency(freq, callback) {
    var query = Checkin.find({
            frequency: freq
        })
        .populate('answers.user');
    query.exec(callback);
}

function findCheckinsByAnswerDate(year, month, date, callback) {
    var dateplus = parseInt(date)+2;
    var dateminus = parseInt(date); 
    var downumber  = new Date(year, month, date).getDay();
    var days = ['Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday'];
    var dow = days[downumber];
    var from  = new Date(year, month, dateminus);
    var to  = new Date(year, month, dateplus);
    console.log(from);
    console.log(to);
    var query = Checkin.aggregate(
        {$match: {frequency: dow}},
        {$project: {
            question: 1,
            project: 1,
            frequency: 1,
            isTurnedOn: 1,
            time: 1,
            answers:  {
                $filter: {
                    input: "$answers",
                    as: "ans",
                    cond: { $and: [ 
                    	{$gt: ["$$ans.creationDate", from ]},
                    	{$lt: ["$$ans.creationDate", to]}
                    ]}
                }
            }
        }
        }
    ).exec(function(err, checkins){
        User.populate(checkins, {path: 'answers.user'}, callback);
    });
}

function updateAnswerItem(id, data, callback) {
    var query = Checkin.update({
        'answers.token': id
    }, {
        $set: {
            'answers.$.answer': data.answer
        }
    });
    query.exec(callback);
}

function getAnswersById(id, callback) {
    var query = Checkin.find({
        _id: id
    }, {
        answers: 1
    })
    query.exec(callback);
}

function getQuestionsByProject(id, callback) {
    var query = Checkin.find({
        project: id
    }, {
        question: 1
    })
    query.exec(callback);
}



module.exports = new CheckinRepository();