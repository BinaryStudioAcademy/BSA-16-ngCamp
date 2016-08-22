var Repository = require("./generalRepository");
var Report = require("../schema/reportSchema");

function ReportRepository() {
    Repository.prototype.constructor.call(this);
    this.model = Report;
}

ReportRepository.prototype = new Repository();

module.exports = new ReportRepository();
