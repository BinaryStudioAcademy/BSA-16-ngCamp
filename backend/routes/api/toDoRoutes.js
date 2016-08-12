var apiResponse = require("express-api-response"),
    toDoService = require("../../services/toDoService"),
    toDoRepository = require("../../repositories/toDoRepository"),
    baseUrl = "/api/task/:id/todo/";

module.exports = function (app) {

    app.get(baseUrl, function (req, res, next) {
        toDoRepository.getAllToDosInTask(req.params.id, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);
    //===================================================
    app.get(baseUrl + ":toDoId", function (req, res, next) {
        toDoRepository.getById(req.params.toDoId, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        })
    }, apiResponse);
    //===================================================
    app.post(baseUrl, function (req, res, next) {
        toDoService.addToDoValidations(req.body, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);
    //===================================================
    app.put(baseUrl + ":toDoId", function (req, res, next) {
        toDoService.updateToDo(req.params.toDoId, req.body, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);
    //===================================================
    app.delete(baseUrl + ':toDoId', function (req, res, next) {
        toDoRepository.deleteById(req.params.toDoId, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);
    //===================================================
    app.delete(baseUrl, function (req, res, next) {
        toDoRepository.deleteAllToDosInTask(req.params.id, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);
}