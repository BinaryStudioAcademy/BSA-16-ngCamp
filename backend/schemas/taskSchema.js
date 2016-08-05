var mongoose = require("mongoose");
var Schema = mongoose.Schema;
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
    isFinished: boolean,
    toDos: [{
            type: Schema.Types.ObjectId,
            ref: 'ToDo'
        }
    ]
});

module.exports = mongoose.model('Task', TaskSchema);