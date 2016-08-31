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


module.exports = new ReportService();
