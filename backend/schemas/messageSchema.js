var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./userSchema');
var Project = require('./projectSchema');

var messageSchema = new Schema({
    title: String,
    description: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    },
    date: Date,
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
    files: [String]
});

module.exports = mongoose.model('Message', messageSchema);