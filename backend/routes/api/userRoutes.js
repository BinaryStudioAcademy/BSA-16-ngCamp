var apiResponse = require('express-api-response'),
    userService = require('../../services/userService'),
    userRepository = require('../../repositories/userRepository'),
    baseUrl = '/api/user/';

module.exports = function (app) {
    app.get(baseUrl, function (req, res, next) {
        userRepository.getAll(function (err, data) {
            for (var i = 0; i < data.length; i++) {
                data[i] = data[i].toObject();
            }
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.get(baseUrl + ':id', function (req, res, next) {
        userRepository.getById(req.params.id, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.post(baseUrl, function (req, res, next) {
        userService.addItem(req.body, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.put(baseUrl, function (req, res, next) {
        userService.updateItem(req.body, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.delete(baseUrl + ':id', function (req, res, next) {
        userRepository.deleteById(req.params.id, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);
};
