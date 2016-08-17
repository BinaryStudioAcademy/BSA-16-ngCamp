var Repository = require('./generalRepository');
var Project = require('../schemas/projectSchema');

ProjectRepository.prototype = new Repository();
ProjectRepository.prototype.addParticipants= addParticipants;
ProjectRepository.prototype.removeParticipants= removeParticipants;
ProjectRepository.prototype.getProjectsByParticipantId = getProjectsByParticipantId;
ProjectRepository.prototype.getByIdWithUsers = getByIdWithUsers;

function ProjectRepository() {
    Repository.prototype.constructor.call(this);
    this.model = Project;
};

function getProjectsByParticipantId(userId, callback) {
 var model = this.model;
 var query = model.find({participants: userId});
 query.exec(callback);
}

function getByIdWithUsers(id,callback){
    var query = this.model.findOne({
        _id:id
    }
    ).populate('participants');
    query.exec(callback);
}

function addParticipants(id, data, callback){
    var model = this.model;
    var query = model.update({
        _id: id
    },{
        $addToSet: {
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
            participants: data,
        }
    },
        {
        multi: true
    });
    query.exec(callback);
}

function  changeState( id , state , callback ){
    var query = this.model;

    var conditions = {
        _id: id
    };

    var update = {
        $set: {
            "status": state
        }
    };

    query.update( conditions , update ).exec( callback );
}

module.exports = new ProjectRepository();