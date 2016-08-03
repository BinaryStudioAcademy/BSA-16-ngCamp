var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var File = require("./FileSchema");
var Project = require("./ProjectSchema");
var User = require("./UserSchema");

var EventSchema = new Schema({
    title: String,
    description: String,
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    },
    isAllDay: Boolean,
    stardDate: Date,
    endDate: Date,
    participants: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    files: [{
        type: Schema.Types.ObjectId,
        ref: "File"
    }]

});

module.exports = mongoose.model('Event', eventSchema);