var apiResponse = require('express-api-response'),
    fileRepository = require('../../repositories/fileRepository'),
    fileService = require('../../services/fileService'),
    baseUrl = '/api/files/';

module.exports = function(app) {

	app.get(baseUrl + 'user/:id', function(req, res, next){
		fileRepository.findFilesThatAvailableToUserByUserId(req.params.id, function(err, data){
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.get(baseUrl + ':id', function (req, res, next) {
        fileRepository.getById(req.params.id, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

	app.post(baseUrl, function(req, res, next) {
		fileService.addItem(req.body, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.put(baseUrl, function (req, res, next) {
        fileService.updateItem(req.body, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

	app.delete(baseUrl + ':id', function (req, res, next) {
        fileRepository.deleteById(req.params.id, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);
}



