module.exports = function(app) {
	return {
		projectRoutes: require('./projectRoutes')(app),
		messageRoutes: require('./messageRoutes')(app),
		userRoutes: require('./userRoutes')(app)
	};
};