var Repository = require('./generalRepository'),
    Checkin = require('../schemas/checkinSchema'),
    Mongoose = require('mongoose'),
    ObjectId = Mongoose.Types.ObjectId,
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
CheckinRepository.prototype.getQuestionsByProject = getQuestionsByProject;
CheckinRepository.prototype.getCheckinsByProjectAndUser = getCheckinsByProjectAndUser;

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

function getCheckinsByProjectAndUser(userId,projectId, callback) {
    var query = Checkin.aggregate(
        {$match: {
            project: new ObjectId(projectId),
            participants: new ObjectId(userId)
            }
        },
        {$project: {
            // _id: 0,
            question: 1,
            answers:  {
                $filter: {
                    input: "$answers",
                    as: "ans",
                    cond: { $eq: [ '$$ans.user', new ObjectId(userId) ]}
                    }
                }
            }
        });
    query.exec(callback);
}


function getByAnswerToken(id, token, callback) {
    var query = Checkin.aggregate(
        {$match: {
            _id: new ObjectId(id)
            }
        },
        {$project: {
            _id: 0,
            question: 1,
            answers:  {
                $filter: {
                    input: "$answers",
                    as: "ans",
                    cond: { $eq: [ '$$ans.token', token ]}
                    }
                }
            }
        },
        {$project: {
            question: 1,
            'answer': '$answers.answer'
            }
        });
    query.exec(callback);
}

function getAll(callback) {
    var query = Checkin.find({})
        .populate('participants');
    query.exec(callback);
}

// is  used in sheduleCheckins only
function findCheckinsByFrequencyAndTime(freq, time, callback) {
    var query = Checkin.find({
        frequency: {$regex: freq },
        isTurnedOn: true,
        time: time
    }).populate('project');
    query.exec(callback);
}
// not for mainpage
function findCheckinsByFrequency(freq, callback) {
    var query = Checkin.find({
            frequency: {$regex: freq }
        })
        .populate('answers.user');
    query.exec(callback);
}


function updateAnswerItem(checkinId, id, data, callback) {
    var query = Checkin.update({
        _id: checkinId,
        'answers.token': id
    }, {
        $set: {
            'answers.$.editedDate': data.editedDate,
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