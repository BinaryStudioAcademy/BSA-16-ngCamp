var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CheckinSchema = new Schema({
    title: String,
    question: String,
    isTurnedOn: Boolean,
    participants: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    frequency: String,
    answers: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        answer: String,
        creationDate: Date,
        editedDate: Date
    }]
});

module.exports = mongoose.model('Checkin', CheckinSchema);