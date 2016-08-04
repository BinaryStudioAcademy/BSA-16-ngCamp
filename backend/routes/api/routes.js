module.exports = function (app) {
    app.use('/user', require('./userController'));
};