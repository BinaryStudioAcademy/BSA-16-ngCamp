var userRepository = require('../repositories/userRepository'),
    fileRepository = require('../repositories/fileRepository'),
    fs = require('fs'),
    path = require('path');

var rootPath = path.resolve(__dirname+'/../../'+'files');


function UploadService() {
}

UploadService.prototype.saveFile = saveFile;
UploadService.prototype.downloadFile = downloadFile;
UploadService.prototype.multDownload = multDownload;

function multDownload(idList,callback){
    var filesDataArray = [];
    idList = idList.split(",");
    idList.forEach(function(elem,index,array){
        fileRepository.getById(elem, function(err,data){
            if(err){
                callback({message: "Get File error"});
            }else{
                filesDataArray.push({path: data.url, name: data.name});
                if(index == array.length-1){
                    callback(undefined,filesDataArray);
                };
            }
        });
    });
}

function downloadFile(id,callback){
    fileRepository.getById(id,function(err,data){
        console.log(data.url);
        if(err){
            callback({message: "File don't find :("});
        }else{
            callback(undefined, data);
        };
    });
}

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
