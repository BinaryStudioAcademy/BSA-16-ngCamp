var checkinRepository = require('../repositories/checkinRepository'),
    Checkin = require('../schemas/checkinSchema'),
    Mongoose = require('mongoose'),
    ObjectId = Mongoose.Types.ObjectId,
    validationService = require('./validationService'),
    User = require('../schemas/checkinSchema');

function CheckinService() {

}

CheckinService.prototype.addItem = addItem;
CheckinService.prototype.updateItem = updateItem;
CheckinService.prototype.addAnswer = addAnswer;
CheckinService.prototype.findCheckinsByAnswerDate = findCheckinsByAnswerDate;

function addItem(body, callback) {
    if (addCheckinValidation(body, callback)) {
        checkinRepository.add(body, callback);
    }    
}

function updateItem(id, body, callback) {
    checkinRepository.setObjPropsById(id, body, callback);
}

function addAnswer(checkinId, id, body, callback){
    body.editedDate = Date();
    checkinRepository.updateAnswerItem(checkinId, id, body, callback);
}

function addCheckinValidation(body, callback) {
    if (!body.question) {
        callback({
            message: 'question isn\'t defined'
        }, null);
        return false;
    }
    return true;
}

function findCheckinsByAnswerDate(projectId, year, month, date, callback) {
    var to = new Date(year, month, parseInt(date)+2);
    var from = new Date(year, month, date);
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
    var query = Checkin.aggregate(
        {$match: {
            frequency: {$regex: dow },
            project: new ObjectId(projectId)
        }},
        {$project: {
            question: 1,
            // project: 1,
            frequency: 1,
            // isTurnedOn: 1,
            time: 1,
            answers:  {
                $filter: {
                    input: "$answers",
                    as: "ans",
                    cond: { $and: [ 
                    	{$gt: ["$$ans.creationDate", from ]},
                    	{$lt: ["$$ans.creationDate", to]},
                        {$ne: ["$$ans.answer", 'noAnswer']}
                    ]}
                }
            },
        }},
        {$project: {
            question: 1,
            // project: 1,
            frequency: 1,
            // isTurnedOn: 1,
            time: 1,
            answers: 1, 
            answersLength: {
                $size: '$answers'
            }
        }},
        {$match: {
            answersLength: {$gt: 0},
        }
    }).exec(function(err, checkins){
        User.populate(checkins, {path: 'answers.user', select: 'firstName lastName'}, callback);
    });
}

module.exports = new CheckinService();
