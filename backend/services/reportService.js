var reportRepository = require('../repositories/reportRepository');
var eventRepository = require('../repositories/eventRepository');
var checkinRepository = require('../repositories/checkinRepository');
var messageRepository = require('../repositories/messageRepository');
var taskRepository = require('../repositories/taskRepository');
var validationService = require("./validationService");

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
    console.log(id);
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

        callback(null, "op");
    }
}


module.exports = new ReportService();
