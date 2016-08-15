var Repository = require('./generalRepository');
var Project = require('../schemas/projectSchema');

ProjectRepository.prototype = new Repository();
ProjectRepository.prototype.addParticipants= addParticipants;
ProjectRepository.prototype.removeParticipants= removeParticipants;

function ProjectRepository() {
    Repository.prototype.constructor.call(this);
    this.model = Project;
};

function addParticipants(id, data, callback){
    var model = this.model;
    var query = model.update({
        _id: id
    },{
        $push: {
            participants: {
                $each: data
            }
        }
    });
    query.exec(callback);
}

function removeParticipants(id, data, callback){
    var model = this.model;
    var query = model.update({
        _id: id
    },{
        $pull: {
            participants: {
                $in: data
            }
        }
    },
        {
        multi: true
    });
    query.exec(callback);
}
module.exports = new ProjectRepository();