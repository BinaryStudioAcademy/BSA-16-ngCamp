var Repository = require("./generalRepository");
var Report = require("../schemas/reportSchema");

function ReportRepository() {
    Repository.prototype.constructor.call(this);
    this.model = Report;
}

ReportRepository.prototype = new Repository();
ReportRepository.prototype.getRecent = getRecent;
ReportRepository.prototype.getSaved = getSaved;
ReportRepository.prototype.getItem = getItem;


function getRecent(id, project, callback) {
    var model = this.model;
    var query = model.find({
        user: id,
        project: project
    }, {
        title: 1,
        description: 1,
        creationDate: 1
    }).sort({
        creationDate: -1
    });
    query.exec(callback);
}

function getSaved(id, project, callback) {
    var model = this.model;
    var query = model.find({
        user: id,
        isSaved: true,
        project: project
    }).populate({
        path: "participants",
        select: "firstName lastName"
    });
    query.exec(callback);
}

function getItem(id, callback) {
    var model = this.model;
    var query = model.find({
        _id: id
    }).populate({
        path: "participants",
        select: "firstName lastName"
    });
    query.exec(callback);
}

module.exports = new ReportRepository();
