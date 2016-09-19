var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Project = require('./projectSchema');
var bcrypt = require('bcrypt-nodejs');

var User = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    role: String,
    position: String,
    company: String,
    currentProject: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    },
    imageUrl: String,
    projects: [{
        type: Schema.Types.ObjectId,
        ref: 'Project'
    }]
});

User.pre('save', function(next) {
    var userData = this;

    if (!userData.isModified('password')) return next();

    bcrypt.genSalt(1012, function(err, salt) {
        bcrypt.hash(userData.password, null, null, function(err, hash) {
            userData.password = hash;
            next();
        });
    });
});


module.exports = mongoose.model('User', User);