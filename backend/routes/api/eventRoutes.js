var apiResponse = require("express-api-response"),
    eventService = require("../../services/eventService"),
    eventRepository = require("../../repositories/eventRepository"),
    baseUrl = "/api/event/";

module.exports = function (app) {

    app.get(baseUrl, function (req, res, next) {
        eventRepository.getAllWithParticipants(function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);
    //===================================================
    app.get(baseUrl + ":id", function (req, res, next) {
        eventRepository.getById(req.params.id, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        })
    }, apiResponse);
    //===================================================
    app.post(baseUrl, function (req, res, next) {
        eventService.addItem(req.body, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);
    //===================================================
    app.put(baseUrl + ":id", function (req, res, next) {
        eventService.updateEvent(req.params.id, req.body, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);
    //===================================================
    app.delete(baseUrl + ':id', function (req, res, next) {
        eventRepository.deleteById(req.params.id, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);
    //===================================================
    app.get(baseUrl + "from/:startDate/to/:endDate", function (req, res, next) {
        eventService.getByDate(req.params.startDate, req.params.endDate, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        })
    }, apiResponse);
    //===================================================
    app.get(baseUrl + ":id/participants", function (req, res, next) {
        eventService.getParticipants(req.params.id, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        })
    }, apiResponse);
    //===================================================
    app.post(baseUrl + ":id/participants", function (req, res, next) {
        eventService.setParticipants(req.params.id, req.body,
            function (err, data) {
                res.data = data;
                res.err = err;
                next();
            })
    }, apiResponse);
    //===================================================
    app.get(baseUrl + ":id/files", function (req, res, next) {
        eventService.getFiles(req.params.id, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        })
    }, apiResponse);
    //===================================================
    app.post(baseUrl + ":id/files", function (req, res, next) {
        console.log(req.body);
        eventService.setFiles(req.params.id, req.body,
            function (err, data) {
                res.data = data;
                res.err = err;
                next();
            })
    }, apiResponse);
    app.get(baseUrl + ':id' + '/comments', function (req, res, next) {
        eventRepository.getByIdWithComments(req.params.id, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);
    app.put(baseUrl + ':id' + '/comment', function(req, res, next){
        eventRepository.addComment(req.params.id, req.body, function(err, data){
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);
}