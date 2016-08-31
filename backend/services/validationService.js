function ValidationService() {

}

ValidationService.prototype.updateUserValidation = updateUserValidation;
ValidationService.prototype.addUserValidation = addUserValidation;
ValidationService.prototype.MessageValidation = MessageValidation;
ValidationService.prototype.ProjectValidation = ProjectValidation;
ValidationService.prototype.addEventValidation = addEventValidation;
ValidationService.prototype.addTaskValidation = addTaskValidation;
ValidationService.prototype.addToDoValidation = addToDoValidation;
ValidationService.prototype.validationBodyProperty = validationBodyProperty;
ValidationService.prototype.manageProjectParticipants = manageProjectParticipants;
ValidationService.prototype.eventsDateValidation = eventsDateValidation;
ValidationService.prototype.manageArrayInput = manageArrayInput;
ValidationService.prototype.addReportValidation = addReportValidation;
ValidationService.prototype.TaskParticipantValidation = TaskParticipantValidation;

function MessageValidation(body, callback) {
    if (!body.hasOwnProperty('isDraft')) {
        callback({
            message: 'Message isDraft property not defined'
        }, null);
        return false;
    }
    if (!body.title || !body.description) {
        callback({
            message: 'Message title or description not defined '
        }, null);
        return false;
    }
    if (!body.author) {
        callback({
            message: 'Message author not defined '
        }, null);
        return false;
    }
    if (!body.project) {
        callback({
            message: 'Message project not defined '
        }, null);
        return false;
    } else return true;
}

function ProjectValidation(body, callback) {
    if (!body.title && !body.description) {
        callback({
            message: 'Project name or description isn\'t defined'
        }, null);
        return false;
    } else return true;
}

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
    /* if (!body.password) {
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
     }*/
    return true;
}

function updateUserValidation(body, callback) {
    if (!body.firstName) {
        callback({
            message: "User name is undefined"
        });
        return false;
    }
    if (!body.lastName) {
        callback({
            message: "User lastname is undefined"
        });
        return false;
    }
    if (!body.email) {
        callback({
            message: "User email is undefined"
        });
        return false;
    }
    return true;
}

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
    if (!body.participants || body.participants.length <= 0) {
        callback({
            message: "Nobody take a part in event"
        });
        return false;
    }
    return true;
}

//=========================================================
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
    return true;
}

function TaskParticipantValidation(participantId,callback){
 if(typeof participantId === "string"){
    return true
 }else{
    callback({
        message: "Invalid participant id"
    });
 };
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
function addToDoValidation(body, callback) {
    if (!body.title) {
        callback({
            message: "To-do title is undefined"
        });
        return false;
    }
    if (!body.task) {
        callback({
            message: "Task id is undefined"
        });
        return false;
    }
    return true;
}
//===========================================================
function manageProjectParticipants(body, callback) {
    if (body.length <= 0) {
        callback({
            message: "No participants here"
        });
        return false;
    }
    return true;
}
//===========================================================
function manageArrayInput(body, callback) {
    if (body.length <= 0) {
        callback({
            message: "Invalid input array"
        });
        return false;
    }
    return true;
}
//============================================================
function eventsDateValidation(startDate, endDate, callback) {
    var firstDate = Date.parse(startDate);
    var secondDate = Date.parse(endDate);
    if ((isNaN(startDate) && !isNaN(firstDate)) && (isNaN(endDate) && !isNaN(secondDate))) {
        return true;
    } else {
        callback({
            message: "Invalid events dates"
        });
        return false;
    }
}
//=============================================================
function addReportValidation(body, callback) {
    console.log(body);
    if (!body.user) {
        callback({
            message: "Report owner is undefined"
        });
        return false;
    }
    if (!body.project) {
        callback({
            message: "Report project is undefined"
        });
        return false;
    }
    if (!body.title) {
        callback({
            message: "Report title is undefined"
        });
        return false;
    }
    if (((!body.types || body.types.length <= 0) && (!body.participants || body.participants.length <= 0)) && (!body.dateRange || body.dateRange.length <= 0)) {
        callback({
            message: "Report filter is undefined"
        });
        return false;
    }
    if (body.isSaved === undefined) {
        callback({
            message: "Report saving is undefined"
        });
        return false;
    }
    return true;
}
module.exports = new ValidationService();
