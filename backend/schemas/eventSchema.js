var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var EventSchema = new Schema({
    title: String,
    description: String,
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    },
    isAllDay: Boolean,
    startDate: Date,
    endDate: Date,
    participants: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    files: [{
        type: Schema.Types.ObjectId,
        ref: "File"
    }],
    comments: [
        {
            author: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            date: Date,
            description: String,
            files: [String]
        }
    ],
    author:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model('Event', EventSchema);