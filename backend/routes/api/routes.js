module.exports = function (app) {
    return {
        userRoutes: require('./userRoutes')(app),
        eventRoutes: require('./eventRoutes')(app)
    };
};