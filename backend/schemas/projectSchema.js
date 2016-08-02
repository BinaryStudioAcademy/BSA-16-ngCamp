var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = new Schema({
    title: String,
    description: String,
    participants: [],
    startDate: Date,
    endDate: Date,
    version: String,
    repository: String
});

module.exports = mongoose.model('Project', projectSchema);