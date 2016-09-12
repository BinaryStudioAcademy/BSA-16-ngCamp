var uploadService = require('../../services/uploadService'),
    apiResponse = require('express-api-response');
    fs = require('fs');
    zip = require('express-zip');

var baseUrl = '/api/files/';

module.exports = function (app) {

    app.post(baseUrl + 'message-form', function (req, res, next) {
        uploadService.saveFile(req.files.file, req.session.user.currentProject, "message", function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.post(baseUrl + 'event-form', function (req, res, next) {
        uploadService.saveFile(req.files.file, req.session.user.currentProject, "event", function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.post(baseUrl + 'task-form', function (req, res, next) {
        uploadService.saveFile(req.files.file, req.session.user.currentProject, "task", function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.post(baseUrl + 'comment-form', function (req, res, next) {
        uploadService.saveFile(req.files.file, req.session.user.currentProject, "comment", function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.get(baseUrl+"download/"+ ":id", function (req,res,next){
        uploadService.downloadFile(req.params.id,function(err,data){
            // res.setHeader('Content-disposition', 'attachment; filename=' + data.name);
            // res.setHeader('Content-type', data.type);
            // var filestream = fs.createReadStream(data.url);
            // filestream.pipe(res);
            res.download(data.url);
            res.err = err;
        });

    }, apiResponse);
    app.get(baseUrl+"downloadAll/"+":sourceIdList", function(req,res,next){
        console.log(req.params.sourceIdList);
        uploadService.multDownload(req.params.sourceIdList, function(err,data){
            res.zip(data);
            res.err = err;
        });
    }, apiResponse);
}
