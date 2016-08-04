module.exports = function (app) {
    return {
        userRoutes: require('./userRoutes')(app),
        fileRoutes: require('./fileRoutes')(app)
    };
};
