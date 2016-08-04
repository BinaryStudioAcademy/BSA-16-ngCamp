var apiResponse = require('express-api-response');
var projectRepository = require('../../repositories/projectRepository');

module.exports = function(app) {
	app.get('/api/project/', function(req, res, next){
		projectRepository.getAll(function(err, data){
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);


	app.post('/api/project/', function(req, res, next) {
        console.log(req.params);
		projectRepository.add(req.body, function(err, data) {
			res.data = data;
			res.err = err;

			next();
		});
	}, apiResponse);

}

