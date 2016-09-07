var uploadService = require('../../services/uploadService'),
    apiResponse = require('express-api-response');

var baseUrl = '/api/files/';

module.exports = function (app) {

    app.post(baseUrl + 'message-form', function (req, res, next) {
        uploadService.saveFile(req.files.file, req.session.user.currentProject, "message", function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.post(baseUrl + 'event-form', function (req, res, next) {
        uploadService.saveFile(req.files.file, req.session.user.currentProject, "event", function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.post(baseUrl + 'task-form', function (req, res, next) {
        uploadService.saveFile(req.files.file, req.session.user.currentProject, "task", function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.post(baseUrl + 'comment-form', function (req, res, next) {
        uploadService.saveFile(req.files.file, req.session.user.currentProject, "comment", function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);
}
