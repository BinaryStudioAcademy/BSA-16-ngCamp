var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ToDo = require('./toDoSchema');

var TaskSchema = new Schema({
    title: String,
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    },
    description: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    dateCreated: Date,
    files: [{
        type: Schema.Types.ObjectId,
        ref: 'File'
    }],
    archived: Boolean,
    isFinished: Boolean
});

TaskSchema.pre('remove', function(next){
    ToDo.remove({task: this._id}, function(err, obj) {
        }).exec();
    next();
});

module.exports = mongoose.model('Task', TaskSchema);