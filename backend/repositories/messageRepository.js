var Repository = require('./generalRepository');
var Message = require('../schemas/messageSchema');

MessageRepository.prototype = new Repository();
MessageRepository.prototype.getMessagesWithAuthors = getMessagesWithAuthors;
MessageRepository.prototype.getByIdWithComments = getByIdWithComments;
MessageRepository.prototype.addComment = addComment;
MessageRepository.prototype.getDrafts = getDrafts;

function MessageRepository() {
    Repository.prototype.constructor.call(this);
    this.model = Message;
};

function getMessagesWithAuthors(callback) {
    var model = this.model;
    var query = model.find().populate('author').populate({path: 'files'});
    query.exec(callback);
}

function getDrafts(id,callback){
    var model = this.model;
    var query = model.find({
        author:id,
        isDraft:true
    });
    query.exec(callback);
}

function getByIdWithComments(id, callback) {
    var model = this.model;
    var query = model.findOne({
        _id: id,
    }).populate({
    	path:'comments.author',
    });
    query.exec(callback);
}

function addComment(id, data, callback){
    var model = this.model;
    var query = model.update({
        _id: id
    },{
        $push: {
            comments: {
                $each: data
            }
        }
    });
    query.exec(callback);
}


module.exports = new MessageRepository();