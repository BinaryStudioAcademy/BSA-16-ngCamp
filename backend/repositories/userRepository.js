var Repository = require('./generalRepository'),
        User = require('../schemas/userSchema');

function UserRepository() {
    Repository.prototype.constructor.call(this);
    this.model = User;
}

UserRepository.prototype = new Repository();


module.exports = new UserRepository();
