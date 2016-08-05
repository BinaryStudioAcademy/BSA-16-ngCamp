var apiResponse = require('express-api-response');
var messageRepository = require('../../repositories/messageRepository');
var messageService = require('../../services/messageService');
var baseUrl = '/api/messages/';

module.exports = function(app) {
    app.get(baseUrl, function (req, res, next) {
        messageRepository.getAll(function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.get(baseUrl + ':id', function (req, res, next) {
        messageRepository.getById(req.params.id, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

	app.post(baseUrl, function (req, res, next) {
		messageService.addItem(req.body, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.put(baseUrl + ':id', function(req, res, next){
		messageService.updateItem(req.params.id, req.body, function(err, data){
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

    app.delete(baseUrl + ':id', function(req, res, next){
		messageRepository.deleteById(req.params.id, function(err, data){
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);


}