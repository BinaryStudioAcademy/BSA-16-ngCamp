var userRepository = require('../repositories/userRepository'),
    fs = require('fs');

var rootPath = 'C:/www/BSA-16-ngCamp/test/';

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
function saveFile(res, file, entity) {
    var filePath = rootPath + entity + "/";
    checkDir(filePath);
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
