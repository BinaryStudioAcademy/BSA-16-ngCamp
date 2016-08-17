var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Task = require('./taskSchema');
var Event = require('./eventSchema');
var Message = require('./messageSchema');
var User = require('./userSchema.js');


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
    repository: String,
    status: {
        type: String,
        enum: ['active','finished','deleted']
    }
});


// projectSchema.pre('remove', function(next) {
//     var tasks = Task.find({
//         project: this._id
//     }, function(err, data) {
//         if (err) {
//             console.log(err);
//         }
//     });
//     tasks.then(function(tasks) {
//         tasks.forEach(function(task) {
//             task.remove();
//         });
//     });
//     next();
// });

// projectSchema.pre('remove', function(next) {
//     var user = User;
//     var conditions = {
//         projects: {
//             $in: [this._id]
//         }
//     };
//     var update = {
//         $pull: {
//             projects: this._id
//         },
//         $set: {
//             curentProject: this._id
//         }
//     };
//     var options = {
//         multi: true
//     };

//     console.log(user.update);
// });


// projectSchema.pre('remove', function(next) {
//     Event.remove({
//         project: this._id
//     }, function(err, obj) {}).exec();
//     Message.remove({
//         project: this._id
//     }, function(err, obj) {}).exec();
//     next();
// });

module.exports = mongoose.model('Project', projectSchema);