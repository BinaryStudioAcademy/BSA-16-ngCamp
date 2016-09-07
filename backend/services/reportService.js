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
                    var queryM = {
                        project: data.project
                    };
                    var selectM = {
                        title: 1,
                        description: 1,
                        date: 1,
                        author: 1
                    }
                    var populateM = [{
                        path: "author",
                        select: "firstName secondName",
                        model: "User"
                    }];
                    if (data.participants && data.participants.length > 0) {
                        queryM.author = {
                            $in: data.participants
                        }
                    }
                    if (data.dataRange && data.dataRange.length > 0) {
                        query.date = {};
                        if (data.dataRange[0]) {
                            queryM.date.$gte = data.dataRange[0];
                        }
                        if (data.dataRange[1]) {
                            queryM.date.$lte = data.dataRange[1];
                        }
                    }
                    //console.log(query);
                    parallel.message = function (cb) {
                        getData(messageRepository, queryM, selectM, populateM, cb);
                    }
                    break;
                }
            case "Event":
                {
                    var queryE = {
                        project: data.project
                    };
                    var selectE = {
                        project: 0,
                        isAllDay: 0,
                        files: 0
                    }
                    var populateE = [{
                        path: "author",
                        select: "firstName secondName",
                        model: "User"
                    }, {
                        path: "participants",
                        select: "firstName secondName",
                        model: "User"
                    }];

                    if (data.participants && data.participants.length > 0) {
                        queryE.$or = [
                            {
                                author: {
                                    $in: data.participants
                                }
                            }, {
                                participants: {
                                    $in: data.participants
                                }
                            }
                        ];
                    }
                    if (data.dataRange && data.dataRange.length > 0) {
                        queryE.$and = [];
                        if (data.dataRange[0]) {
                            queryE.$and.push({
                                startDate: {
                                    $gte: data.dataRange[0]
                                }
                            });
                        }
                        if (data.dataRange[1]) {
                            queryE.$and.push({
                                endDate: {
                                    $lte: data.dataRange[1]
                                }
                            });
                        }
                        if (queryE.$and.length == 0) {
                            queryE.$and = undefined;
                        }
                    }
                    // console.log(query);
                    parallel.event = function (cb) {
                        getData(eventRepository, queryE, selectE, populateE, cb);
                    }
                    break;
                }
            case "Task":
                {
                    var queryT = {
                        project: data.project
                    };
                    var selectT = {
                        title: 1,
                        description: 1,
                        participants: 1,
                        author: 1,
                        isFinished: 1
                    }
                    var populateT = [{
                            path: "author",
                            select: "firstName secondName",
                            model: "User"
                    },

                        {
                            path: "participants",
                            select: "firstName secondName",
                            model: "User"
                            }
                            ];
                    if (data.participants && data.participants.length > 0) {
                        queryT.$or = [
                            {
                                author: {
                                    $in: data.participants
                                }
                            }, {
                                participants: {
                                    $in: data.participants
                                }
                            }
                        ];
                    }
                    if (data.dataRange && data.dataRange.length > 0) {
                        queryT.dateCreated = {};
                        if (data.dataRange[0]) {
                            queryT.dateCreated.$gte = data.dataRange[0];
                        }
                        if (data.dataRange[1]) {
                            queryT.dateCreated.$lte = data.dataRange[1];
                        }
                    }

                    parallel.task = function (cb) {
                        getData(taskRepository, queryT, selectT, populateT, cb);
                    }
                    break;
                }
            case "CheckIn":
                {
                    var queryCk = {
                        project: data.project
                    };
                    var selectCk = {
                        title: 1,
                        question: 1,
                        participants: 1,
                        time: 1,
                        frequency: 1
                    }
                    var populateCk = [{
                            path: "participants",
                            select: "firstName secondName",
                            model: "User"
                            }
                            ];
                    if (data.participants && data.participants.length > 0) {
                        queryCk.participants = data.participants;

                    }

                    parallel.checkin = function (cb) {
                        getData(checkinRepository, queryCk, selectCk, populateCk, cb);
                    }
                    break;
                }
            }
        }
        async(parallel, function (err, pack) {
            data.creationDate = new Date();
            var reports = [];
            if (pack.event) {
                for (var i = 0; i < pack.event.length; i++) {
                    pack.event[i] = pack.event[i].toJSON();
                    pack.event[i]._type = "event";

                }
                reports = reports.concat(pack.event);

            }
            if (pack.message) {
                for (var i = 0; i < pack.message.length; i++) {
                    pack.message[i] = pack.message[i].toJSON();
                    pack.message[i]._type = "message";

                }
                reports = reports.concat(pack.message);
            }
            if (pack.task) {
                for (var i = 0; i < pack.task.length; i++) {
                    pack.task[i] = pack.task[i].toJSON();
                    pack.task[i]._type = "task";
                }
                reports = reports.concat(pack.task);
            }
            if (pack.checkin) {
                for (var i = 0; i < pack.checkin.length; i++) {
                    pack.checkin[i] = pack.checkin[i].toJSON();
                    pack.checkin[i]._type = "checkin";

                }
                reports = reports.concat(pack.checkin);
            }
            reportRepository.add(data, function (error, da) {
                var res = {
                    db: {
                        data: null,
                        err: null
                    },
                    gen: {
                        data: null,
                        err: null
                    }
                };
                res.db.data = da;
                res.db.err = error;
                res.gen.data = reports;
                res.gen.err = err;
                callback(null, res);
            });
        });
    }
}

function getData(rep, findObj, select, populate, callback) {
    rep.findByObject(findObj, populate, select, callback);
}


module.exports = new ReportService();
