var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = new Schema({
    title: string,
    description: string,
    participants: [],
    startDate: date,
    endDate: date,
    version: string,
    repository: string
});

module.exports = mongoose.model('Project', projectSchema);