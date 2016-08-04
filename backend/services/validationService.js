function ValidationService() {

}

ValidationService.prototype.validationBodyProperty = validationBodyProperty;
ValidationService.prototype.addUserValidation = addUserValidation;

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



module.exports = new ValidationService();