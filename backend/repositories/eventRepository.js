var Repository = require('./generalRepository');
var Event = require('../schemas/eventSchema');

function EventRepository() {
    Repository.prototype.constructor.call(this);
    this.model = Event;
}

EventRepository.prototype = new Repository();
EventRepository.prototype.getByDate = getByDate;
EventRepository.prototype.getParticipants = getParticipants;
EventRepository.prototype.setParticipants = setParticipants;
EventRepository.prototype.getFiles = getFiles;
EventRepository.prototype.setFiles = setFiles;
EventRepository.prototype.getAllWithParticipants = getAllWithParticipants;
EventRepository.prototype.getByIdWithComments = getByIdWithComments;
EventRepository.prototype.addComment = addComment;

function getAllWithParticipants(callback){
    var model = this.model;
    var query = model.find({})
    .populate('participants')
    .populate({path:'comments.author',})
    .populate({path: "files"});
    query.exec(callback);
}

function getByDate(startDate, endDate, callback) {
    var model = this.model;
    var query = model.find({
        startDate: {
            $gte: startDate
        },
        endDate: {
            $lte: endDate
        }
    }, {
        title: 1,
        description: 1,
        project: 1,
        startDate: 1,
        endDate: 1,
        participants: 1
    }).populate({
        path:'comments.author',
    }).populate({
        path: "files"
    });
    query.exec(callback);
}

function getParticipants(id, callback) {
    var model = this.model;
    var query = model.findOne({
        _id: id
    }).populate("participants");
    query.exec(callback);
}

function getFiles(id, callback) {
    var model = this.model;
    var query = model.findOne({
        _id: id
    }).populate("files");
    query.exec(callback);
}

function setParticipants(id, data, callback) {
    var model = this.model;
    var query = model.update({
        _id: id
    }, {
        $addToSet: {
            participants: {
                $each: data
            }
        }
    });
    query.exec(callback);
}

function setFiles(id, data, callback) {
    var model = this.model;
    var query = model.update({
        _id: id
    }, {
        $addToSet: {
            files: {
                $each: data
            }
        }
    });
    query.exec(callback);
}

function getByIdWithComments(id, callback) {
    var model = this.model;
    var query = model.findOne({
        _id: id,
    }).populate({
        path:'comments.author',
    });
    query.exec(callback);
}

function addComment(id, data, callback){
    var model = this.model;
    var query = model.update({
        _id: id
    },{
        $push: {
            comments: {
                $each: data
            }
        }
    });
    query.exec(callback);
}

module.exports = new EventRepository();