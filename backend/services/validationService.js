function ValidationService() {

}

ValidationService.prototype.validationBodyProperty = validationBodyProperty;
ValidationService.prototype.addUserValidation = addUserValidation;
ValidationService.prototype.addEventValidation = addEventValidation;
ValidationService.prototype.addTaskValidation = addTaskValidation;

function addUserValidation(body, callback) {
    if (!body.firstName && !body.lastName) {
        callback({
            message: 'Name isn\'t defined'
        }, null);
        return false;
    }
    if (!body.email) {
        callback({
            message: 'Email is not defined'
        }, null);
        return false;
    }
    if (!body.password) {
        callback({
            message: 'Password is not defined'
        }, null);
        return false;
    }
    if (body.password.length <= 6) {
        callback({
            message: 'Password should be more than 6 chars'
        }, null);
        return false;
    }
    return true;
}

function validationBodyProperty(body, propName, callback) {
    if (!body || !body[propName]) {
        if (callback) {
            callback({
                message: propName + ' is undefined'
            });
        }
        return false;
    }
    return true;
}
//=========================================================
function addEventValidation(body, callback) {
    if (!body.title) {
        callback({
            message: "Event title is undefined"
        });
        return false;
    }
    if (!body.project) {
        callback({
            message: "Project id is undefined"
        });
        return false;
    }
    if (!body.startDate) {
        callback({
            message: "Start date is undefined"
        });
        return false;
    }
    if (!body.endDate) {
        callback({
            message: "End date is undefined"
        });
        return false;
    }
    if (body.participants.length <= 0 || !body.participants) {
        callback({
            message: "Nobody take a part in event"
        });
        return false;
    }

}
//========================================================
function addTaskValidation(body, callback) {
    if (!body.title) {
        callback({
            message: "Task title is undefined"
        });
        return false;
    }
    if (!body.project) {
        callback({
            message: "Project id is undefined"
        });
        return false;
    }
    if (!body.author) {
        callback({
            message: "Author is undefined"
        });
        return false;
    }
    if (!body.toDos.title) {
        callback({
            message: "To-do title is undefined"
        });
        return false;
    }
}

module.exports = new ValidationService();