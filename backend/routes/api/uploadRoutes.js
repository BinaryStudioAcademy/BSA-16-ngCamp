var uploadService = require('../../services/uploadService'),
    apiResponse = require('express-api-response');

var baseUrl = '/api/files/';

module.exports = function (app) {

    app.post(baseUrl + 'message-form', function (req, res, next) {
        uploadService.saveFile(res, req.files.message, req.body.description, "message", function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.post(baseUrl + 'event-form', function (req, res, next) {
        uploadService.saveFile(res, req.files.message, req.body.description, "event", function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.post(baseUrl + 'task-form', function (req, res, next) {
        uploadService.saveFile(res, req.files.message, req.body.description, "task", function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.post(baseUrl + 'comment-form', function (req, res, next) {
        uploadService.saveFile(res, req.files.message, req.body.description, "comment", function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);
}
