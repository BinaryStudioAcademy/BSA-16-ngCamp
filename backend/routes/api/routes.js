module.exports = function (app) {
    return {
        projectRoutes: require('./projectRoutes')(app),
        messageRoutes: require('./messageRoutes')(app),
        userRoutes: require('./userRoutes')(app),
        fileRoutes: require('./fileRoutes')(app),
        eventRoutes: require('./eventRoutes')(app),
        taskRoutes: require('./taskRoutes')(app),
        checkinRoutes: require('./checkinRoutes')(app),
        uploadRoutes: require('./uploadRoutes')(app),
        toDoRoutes: require('./toDoRoutes')(app)
    };
};