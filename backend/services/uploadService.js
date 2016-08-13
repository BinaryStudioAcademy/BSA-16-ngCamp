var userRepository = require('../repositories/userRepository'),
    fileRepository = require('../repositories/fileRepository'),
    fs = require('fs');

var rootPath = 'C:/www/BSA-16-ngCamp/files2';

function UploadService() {
}

UploadService.prototype.saveFile = saveFile;

function checkDir(path){
    if(fs.existsSync(path)){
        return true;
    }
    else{
      createDir(path);
    };
}

function createDir(path){
    var pathArr = path.split('/');
    var curentPath = "";
    for (el in pathArr){
        curentPath = curentPath + pathArr[el] + '/';
        if(!fs.existsSync(curentPath)){
            fs.mkdirSync(curentPath);
        }
    }
    return true;
}
function saveModel(data, callback){
    fileRepository.add(data, callback);
}

function saveFile(res, file, desc, entity) {
    var projectId = "0100101"; // need to remove this hardcode when models will be available from views
    var filePath = rootPath + '/' + projectId + '/' + entity + "/";

    if (checkDir(filePath)) {
        var fileUrl = filePath + file.name;
        file.mv(fileUrl, function (err) {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.send('File uploaded!');
            }
        });
            var data = {
                url: fileUrl,
                description: desc,
                creationDate: Date.now(),
            }
        saveModel(data);
    }
}

module.exports = new UploadService();
