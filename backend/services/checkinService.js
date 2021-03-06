var checkinRepository = require('../repositories/checkinRepository'),
    validationService = require('./validationService');

function CheckinService() {

}

CheckinService.prototype.addItem = addItem;
CheckinService.prototype.updateItem = updateItem;
CheckinService.prototype.addAnswer = addAnswer;


function addItem(body, callback) {
    if (addCheckinValidation(body, callback)) {
        checkinRepository.add(body, callback);
    }    
}

function updateItem(id, body, callback) {
    checkinRepository.setObjPropsById(id, body, callback);
}

function addAnswer(checkinId, id, body, callback){
    body.editedDate = Date();
    checkinRepository.updateAnswerItem(checkinId, id, body, callback);
}

function addCheckinValidation(body, callback) {
    if (!body.question) {
        callback({
            message: 'question isn\'t defined'
        }, null);
        return false;
    }
    return true;
}

module.exports = new CheckinService();
