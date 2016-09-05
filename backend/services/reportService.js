var reportRepository = require('../repositories/reportRepository');
var eventRepository = require('../repositories/eventRepository');
var checkinRepository = require('../repositories/checkinRepository');
var messageRepository = require('../repositories/messageRepository');
var taskRepository = require('../repositories/taskRepository');
var validationService = require("./validationService");
var async = require("async/parallel");

function ReportService() {

}
ReportService.prototype.addItem = addItem;
ReportService.prototype.getItem = getItem;
ReportService.prototype.updateItem = updateItem;
ReportService.prototype.getRecent = getRecent;
ReportService.prototype.getSaved = getSaved;
ReportService.prototype.generateReport = generateReport;

//================================================================
function addItem(body, callback) {
    if (validationService.addReportValidation(body, callback)) {
        var creationDate = Date();
        body.creationDate = creationDate;
        reportRepository.add(body, callback);
    };
}
//================================================================
function updateItem(id, body, callback) {
    reportRepository.setObjPropsById(id, body.data, callback);
}
//================================================================
function getRecent(id, project, callback) {
    if (id && callback) {
        reportRepository.getRecent(id, project, callback);
    }
}
//================================================================
function getSaved(id, project, callback) {
    if (id && callback) {
        reportRepository.getSaved(id, project, callback);
    }
}
//================================================================
function getItem(id, callback) {
    if (id && callback) {
        reportRepository.getItem(id, callback);
    }
}

//============================================================
function generateReport(data, callback) {
    if (validationService.addReportValidation(data, callback)) {
        var types = (!data.types || data.types.length <= 0) ? new Array("Message", "Task", "Event", "Checkin") : data.types;
        var reportTypesCount = types.length;
        var parallel = {};
        for (var i = 0; i < reportTypesCount; i++) {
            switch (types[i]) {
            case "Message":
                {
                    var query = {
                        project: data.project
                    };
                    var select = {
                        title: 1,
                        description: 1,
                        date: 1,
                        author: 1
                    }
                    var populate = [{
                        path: "author",
                        select: "firstName secondName",
                        model: "User"
                    }];
                    if (data.participants && data.participants.length > 0) {
                        query.author = {
                            $in: data.participants
                        }
                    }
                    if (data.dataRange && data.dataRange.length > 0) {
                        query.date = {};
                        if (data.dataRange[0]) {
                            query.date.$gte = data.dataRange[0];
                        }
                        if (data.dataRange[1]) {
                            query.date.$lte = data.dataRange[1];
                        }
                    }
                    parallel[i] = function (cb) {
                        getData(messageRepository, query, select, populate, cb);
                    }
                }
            case "Event":
                {
                    var query = {
                        project: data.project
                    };
                    var select = {
                        project: 0,
                        isAllDay: 0,
                        files: 0
                    }
                    var populate = [{
                        path: "author",
                        select: "firstName secondName",
                        model: "User"
                    }, {
                        path: "participants",
                        select: "firstName secondName",
                        model: "User"
                    }];

                    if (data.participants && data.participants.length > 0) {
                        query.participants = {
                            $in: data.participants
                        };
                    }
                    if (data.dataRange && data.dataRange.length > 0) {
                        query.$and = [];
                        if (data.dataRange[0]) {
                            query.$and.push({
                                startDate: {
                                    $gte: data.dataRange[0]
                                }
                            });
                            //  query.date.$gte = data.dataRange[0];
                        }
                        if (data.dataRange[1]) {
                            // query.date.$lte = data.dataRange[1];
                            query.$and.push({
                                endDate: {
                                    $lte: data.dataRange[1]
                                }
                            });
                        }
                        if (query.$and.length == 0) {
                            query.$and = undefined;
                        }
                    }
                    console.log(query);
                    parallel[i] = function (cb) {
                        getData(eventRepository, query, select, populate, cb);
                    }
                }
            }
        }
        async(parallel, function (err, c) {
            console.log(c);
            console.log(err);
        })

        callback(null, "o");
    }
}

function getData(rep, findObj, select, populate, callback) {
    rep.findByObject(findObj, populate, select, callback);
}


module.exports = new ReportService();
