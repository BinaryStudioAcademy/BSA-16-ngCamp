var apiResponse = require('express-api-response');
var projectRepository = require('../../repositories/projectRepository');
var projectService = require('../../services/projectService');
var baseUrl = '/api/projects/';

module.exports = function(app) {
    app.get(baseUrl, function(req, res, next) {
        projectRepository.getAll(function(err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.get(baseUrl + 'forCurrentUser', function(req, res, next) {
        projectService.getProjectsForCurrentUser(req.session.user._id, function(err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.get(baseUrl + ':id', function(req, res, next) {
        projectRepository.getById(req.params.id, function(err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.get(baseUrl + ':id/users', function(req, res, next) {
        projectRepository.getUsers(req.params.id, function(err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.get(baseUrl + ':id/withUsers', function(req, res, next) {
        projectRepository.getByIdWithUsers(req.params.id, function(err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.post(baseUrl, function(req, res, next) {
        projectService.addItem(req.body, function(err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.put(baseUrl + ':id', function(req, res, next) {
        projectService.updateItem(req.params.id, req.body, function(err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.delete(baseUrl + ':id', function(req, res, next) {
        projectService.deleteItem(req.params.id, function(err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.get(baseUrl + ':id/participants', function(req, res, next) {
        projectRepository.getParticipantsByProjectId(req.params.id, function(err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.post(baseUrl + ':id/participants', function(req, res, next) {
        projectService.addParticipants(req.params.id, req.body, function(err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);
    app.delete(baseUrl + ':id/participants/:part', function(req, res, next) {
        projectService.removeParticipants(req.params.id, req.params.part, function(err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);
    app.delete(baseUrl + ':id/admins/:part', function(req, res, next) {
        projectService.removeAdmins(req.params.id, req.params.part, function(err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.get(baseUrl + ':id/isAdmin/:user', function(req, res, next) {
        projectRepository.isAdmin(req.params.id, req.params.user, function(err, data) {
            console.log(data.length);
            res.data = data;
            res.err = err;
            console.log(data);
            next();
        });
    }, apiResponse);
};