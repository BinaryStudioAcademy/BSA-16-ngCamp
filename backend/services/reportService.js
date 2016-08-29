var reportRepository = require('../repositories/reportRepository');
var validationService = require("./validationService");

function ReportService() {

}
ReportService.prototype.addItem = addItem;
ReportService.prototype.getItem = getItem;
ReportService.prototype.updateItem = updateItem;
ReportService.prototype.getRecent = getRecent;
ReportService.prototype.getSaved = getSaved;

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
    reportRepository.setObjPropsById(id, body, callback);
}
//================================================================
function getRecent(id, callback) {
    if (id && callback) {
        reportRepository.getRecent(id, callback);
    }
}
//================================================================
function getSaved(id, callback) {
    if (id && callback) {
        reportRepository.getSaved(id, callback);
    }
}
//================================================================
function getItem(id, callback) {
    if (id && callback) {
        reportRepository.getItem(id, callback);
    }
}


module.exports = new ReportService();
