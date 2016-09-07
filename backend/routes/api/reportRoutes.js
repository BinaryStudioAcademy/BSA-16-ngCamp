var apiResponse = require("express-api-response"),
    reportService = require("../../services/reportService"),
    reportRepository = require("../../repositories/reportRepository"),
    baseUrl = "/api/report/";

module.exports = function (app) {
    app.get(baseUrl, function (req, res, next) {
        reportRepository.getAll(function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);
    //===================================================
    app.get(baseUrl + ":id", function (req, res, next) {
        reportRepository.getById(req.params.id, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        })
    }, apiResponse);
    //===================================================
    app.post(baseUrl, function (req, res, next) {
        reportService.generateReport(req.body, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);
    //===================================================
    app.put(baseUrl + ":id", function (req, res, next) {
        reportService.updateItem(req.params.id, req.body, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);
    //===================================================
    app.delete(baseUrl + ':id', function (req, res, next) {
        reportRepository.deleteById(req.params.id, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);
    //===================================================
    app.get(baseUrl + ":project/recent/:id", function (req, res, next) {
        reportService.getRecent(req.params.id, req.params.project, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        })
    }, apiResponse);
    //===================================================
    app.get(baseUrl + ":project/saved/:id", function (req, res, next) {
        reportService.getSaved(req.params.id, req.params.project, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        })
    }, apiResponse);
    //===================================================
    app.get(baseUrl + "item/:id", function (req, res, next) {
        reportService.getItem(req.params.id, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        })
    }, apiResponse);
    //===================================================
}
