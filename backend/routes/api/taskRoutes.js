var apiResponse = require("express-api-response"),
    taskService = require("../../services/taskService"),
    taskRepository = require("../../repositories/taskRepository"),
    baseUrl = "/api/task/";

module.exports = function (app) {
    // ==================================================
    app.get(baseUrl+"allFromProject/"+":id", function(req,res,next){
        taskRepository.getAllTasksInProject(req.params.id, function (err,data){
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);
    //===================================================
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
        });
    }, apiResponse);
    //===================================================
    app.get(baseUrl+"populated/"+":id", function (req,res,next){
        taskRepository.getPopulatedTask(req.params.id, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);
    //===================================================
    app.post(baseUrl, function (req, res, next) {
        taskService.addItem(req.body, function (err, data) {
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
    app.put(baseUrl + ":id"+"/addParticipant", function (req, res, next) {
        taskService.addTaskParticipant(req.params.id, req.body.participantId, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.put(baseUrl + ":id"+"/removeParticipant", function (req, res, next) {
        var data = data || {ok: 1};
        taskService.removeTaskParticipant(req.params.id, req.body.participantId, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);
    //===================================================
    app.delete(baseUrl + ':id', function (req, res, next) {
        taskService.deleteTask(req.params.id, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);
    //===================================================
}