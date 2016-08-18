var Repository = require('./generalRepository'),
        User = require('../schemas/userSchema');

function UserRepository() {
    Repository.prototype.constructor.call(this);
    this.model = User;
}

UserRepository.prototype = new Repository();

UserRepository.prototype.getUserByEmail = getUserByEmail;
UserRepository.prototype.removeProjectfromUser = removeProjectfromUser;

function getUserByEmail(email, callback) {
    var query = this.model.findOne({email : email});
    query.exec(callback);
}

function removeProjectfromUser(projectId) {

	var query = this.model;

	var condition = [
	{
		projects: {
			$in: [projectId]
		}
	},
	{
		currentProject: projectId
	}];

	var update = [
	{
		$pull: {
			projects: projectId
		}
	},
	{
		$unset: {
			currentProject: ""
		}
	}];
	
	var options = {
		multi: true
	};

	query.update( condition[0] , update[0] , options ).exec();
	query.update( condition[1] , update[1] , options ).exec();
}

module.exports = new UserRepository();
