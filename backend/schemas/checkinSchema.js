var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CheckinSchema = new Schema({
    title: String,
    project: {
        type: Schema.Types.ObjectId,
        ref: "Project"
    },
    question: String,
    isTurnedOn: Boolean,
    participants: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    time: String,
    frequency: String,
    answers: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        token: String,
        answer: String,
        creationDate: Date,
        editedDate: Date
    }]
});

module.exports = mongoose.model('Checkin', CheckinSchema);