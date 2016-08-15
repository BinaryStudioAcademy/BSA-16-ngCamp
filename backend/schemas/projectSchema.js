var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./userSchema');
var Task = require('./taskSchema');
var Event = require('./eventSchema');
var Message = require('./messageSchema');



var projectSchema = new Schema({
    title: String,
    description: String,
    participants: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    startDate: Date,
    endDate: Date,
    version: String,
    repository: String
});


projectSchema.pre('remove', function(next){
    var tasks = Task.find({project: this._id}, function(err, data){
        if(err){console.log(err);}
    });
    tasks.then(function(tasks){
        tasks.forEach(function(task){
        task.remove();
        });
    });
    next();
});

projectSchema.pre('remove', function(next){
    User.update(
    { projects: { $in: [this._id] }},
    { $pull: { projects: this._id }, { curentProject: this._id}},
    { multi: true }
     ).exec();
    next();
});


projectSchema.pre('remove', function(next){
    Event.remove({project: this._id}, function(err, obj) {
    }).exec();
    Message.remove({project: this._id}, function(err, obj) {
    }).exec();
    next();
});

module.exports = mongoose.model('Project', projectSchema);