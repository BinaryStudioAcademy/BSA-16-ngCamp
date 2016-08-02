var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./userSchema');
var Project = require('./projectSchema');

var messageSchema = new Schema({
    title: string,
    description: string,
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    project: {type: Schema.Types.ObjectId, ref: 'Project'},
    date: date,
    comments: [
        {
            author: {type: Schema.Types.ObjectId, ref: 'User'},
            date: date,
            description: string,
            files: []
        }
    ],
    files: []
});

module.exports = mongoose.model('Message', messageSchema);