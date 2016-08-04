module.exports = function (app) {
    return {
        userRoutes: require('./projectRoutes')(app),
        userRoutes: require('./messageRoutes')(app),
        userRoutes: require('./userController')(app)
    };
};
