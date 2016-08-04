var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Project = require('./projectSchema');

var userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    role: String,
    position: String,
    company: String,
    imageUrl: String,
    projects: [{
            type: Schema.Types.ObjectId,
            ref: 'Project'
        }]
});

module.exports = mongoose.model('User', userSchema);
