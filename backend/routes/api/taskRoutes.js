var apiResponse = require("express-api-response"),
    taskService = require("../../services/taskService"),
    taskRepository = require("../../repositories/taskRepository"),
    baseUrl = "/api/task/";

module.exports = function (app) {

    app.get(baseUrl, function (req, res, next) {
        taskRepository.getAll(function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);
    //===================================================
    app.get(baseUrl + ":id", function (req, res, next) {
        taskRepository.getById(req.params.id, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        })
    }, apiResponse);
    //===================================================
    app.post(baseUrl, function (req, res, next) {
        taskService.addTask(req.body, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);
    //===================================================
    app.put(baseUrl + ":id", function (req, res, next) {
        taskService.updateTask(req.params.id, req.body, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);
    //===================================================
    app.delete(baseUrl + ':id', function (req, res, next) {
        taskRepository.deleteById(req.params.id, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);
    //===================================================
}