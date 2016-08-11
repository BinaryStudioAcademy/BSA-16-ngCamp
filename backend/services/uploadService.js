var userRepository = require('../repositories/userRepository');
var rootPath = 'C:/www/BSA-16-ngCamp/test/';

function UploadService() {
}

UploadService.prototype.saveFile = saveFile;

function saveFile(res, file, entity) {
    var filePath = rootPath + entity + "/" + file.name;
        file.mv(filePath, function(err) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.send('File uploaded!');
        }
    });

}


module.exports = new UploadService();
