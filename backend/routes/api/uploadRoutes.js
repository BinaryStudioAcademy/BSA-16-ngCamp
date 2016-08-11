var uploadService = require('../../services/uploadService'),
    apiResponse = require('express-api-response');

module.exports = function (app) {

    app.post('/postMessage', function (req, res, next) {
        uploadService.saveFile(res, req.files.message, "message", function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);
}
