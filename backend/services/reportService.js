var reportRepository = require('../repositories/reportRepository');
var validationService = require("./validationService");

function ReportService() {

}
ReportService.prototype.addItem = addItem;
ReportService.prototype.updateItem = updateItem;

//================================================================
function addItem(body, callback) {
    if (validationService.addReportValidation(body, callback)) {
        reportRepository.add(body, callback);
    };
}
//================================================================
function updateItem(id, body, callback) {
    reportRepository.setObjPropsById(id, body, callback);
}

module.exports = new ReportService();
