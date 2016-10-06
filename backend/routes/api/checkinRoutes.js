var apiResponse = require('express-api-response'),
    checkinRepository = require('../../repositories/checkinRepository'),
    checkinService = require('../../services/checkinService'),
    baseUrl = '/api/checkins/';

module.exports = function(app) {

    app.get(baseUrl, function(req, res, next) {
        checkinRepository.getAll(function(err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.get(baseUrl + ':id/withparticipants', function(req, res, next) {
        checkinRepository.getByIdWithParticipants(req.params.id, function(err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.get(baseUrl + 'project/:id/questions', function(req, res, next) {
        checkinRepository.getQuestionsByProject(req.params.id, function(err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.get(baseUrl + ':id', function(req, res, next) {
        checkinRepository.getById(req.params.id, function(err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.get(baseUrl + 'answer/:checkinId/:id', function(req, res, next) {
        checkinRepository.getByAnswerToken(req.params.checkinId, req.params.id, function(err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

     app.get(baseUrl + 'answercheckin/:userId/:projectId', function(req, res, next) {
        checkinRepository.getCheckinsByProjectAndUser(req.params.userId, req.params.projectId, function(err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.get(baseUrl + 'freq/:frequency', function(req, res, next) {
        checkinRepository.findCheckinsByFrequency(req.params.frequency, function(err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.get(baseUrl + ':projectId/bydate/:year/:month/:date', function (req, res, next) {
        checkinService.findCheckinsByAnswerDate(req.params.projectId, req.params.year, req.params.month, req.params.date, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.post(baseUrl, function(req, res, next) {
        checkinService.addItem(req.body, function(err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.put(baseUrl + ':id', function(req, res, next) {
        checkinService.updateItem(req.params.id, req.body, function(err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.put(baseUrl + 'answer/:checkinId/:id', function(req, res, next) {
        checkinService.addAnswer(req.params.checkinId, req.params.id, req.body, function(err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.delete(baseUrl + ':id', function(req, res, next) {
        checkinRepository.deleteById(req.params.id, function(err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

}