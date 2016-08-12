var Repository = require('./generalRepository'),
        User = require('../schemas/userSchema');

function UserRepository() {
    Repository.prototype.constructor.call(this);
    this.model = User;
}

UserRepository.prototype = new Repository();

UserRepository.prototype.getUserByEmail = getUserByEmail;

function getUserByEmail(email, callback) {
    var query = this.model.findOne({email : email});
    query.exec(callback);
}

module.exports = new UserRepository();
