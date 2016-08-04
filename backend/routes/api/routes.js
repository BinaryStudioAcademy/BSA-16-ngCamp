var projectRoutes = require('./projectRoutes');

module.exports = function(app) {
	return {
		projectRoutes: projectRoutes(app)
	};
};