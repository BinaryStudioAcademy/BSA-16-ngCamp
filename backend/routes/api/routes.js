<<<<<<< HEAD
var projectRoutes = require('./projectRoutes');

module.exports = function(app) {
	return {
		projectRoutes: projectRoutes(app)
	};
};
=======
module.exports = function (app) {
    return {
        userRoutes: require('./userController')(app)
    };
};
>>>>>>> develop
