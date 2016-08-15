var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ToDoSchema = new Schema({
    task: {
        type: Schema.Types.ObjectId,
        ref: 'Task'
            },
    title: String,
    description: String,
    status: String,
    dateCreated: Date,
    participants: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
            }],
    dateExpired: Date,
    dateFinished: Date
});

module.exports = mongoose.model('ToDo', ToDoSchema);