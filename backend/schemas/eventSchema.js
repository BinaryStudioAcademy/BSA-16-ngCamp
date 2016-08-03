var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Project = require("./projectSchema");

var eventSchema = new Schema({
    title: String,
    description: String,
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    },
    isAllDay: Boolean,
    stardDate: Date,
    endDate: Date,
    participants: [],
    files: []

});

module.exports = mongoose.model('Event', eventSchema);