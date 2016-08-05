var apiResponse = require("express-api-response"),
    eventService = require("../../services/eventService"),
    eventRepository = require("../../repositories/eventRepository"),
    baseUrl = "/api/event/";

module.exports = function (app) {

    app.get(baseUrl, function (req, res, next) {
        eventRepository.getAll(function (err, data) {
            for (var i = 0; i < data.length; i++) {
                data[i] = data[i].toObject();
            }
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
        eventService.addEvent(req.body, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);
    //===================================================
    app.put(baseUrl, function (req, res, next) {
        eventService.updateEvent(req.body, function (err, data) {
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
}