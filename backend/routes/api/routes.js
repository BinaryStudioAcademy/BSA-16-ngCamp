module.exports = function (app) {
    return {
        userRoutes: require('./userController')(app),
        fileRoutes: require('./fileRoutes')(app)
    };
};
