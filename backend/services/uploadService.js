var userRepository = require('../repositories/userRepository'),
    fileRepository = require('../repositories/fileRepository'),
    fs = require('fs'),
    path = require('path');

var rootPath = path.resolve(__dirname+'/../../'+'files');


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

function saveFile(file, projectId, entity, callback) {
    var filePath = rootPath + '/' + projectId + '/' + entity + "/";
    if (checkDir(filePath) && fs.existsSync(filePath)) {
        var fileUrl = path.resolve(filePath, './', file.name);
        file.mv(fileUrl, function (err) {
            if (err) {
                callback(err);
            };
        });
            var data = {
                url: fileUrl,
                creationDate: Date.now(),
                type: file.mimetype,
                size: file.data.length,
                name: file.name
            }
        saveModel(data ,callback);
    }
}

module.exports = new UploadService();
