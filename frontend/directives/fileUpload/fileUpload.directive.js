import './fileUpload.styl';

class fileUploadController{
    constructor($scope,httpGeneral,popupNotifications){
        this.scope = $scope;
        this.http = httpGeneral;
        this.popup = popupNotifications;
        this.uploading = false;
    }

    triggerFileList(){
        document.querySelector('#fileInput').click();
    }

    transformSize(size){
        return `${(size/1048576).toFixed(2)} MB`;
    }

    removeFile(index){
        this.scope.fileList.splice(index,1);
    }

    uploadFiles(files){
        let self = this;
        let file = files[0];
        if(file){
            let formData = new FormData();
            formData.append('file', file);
            let xhr = new XMLHttpRequest;
            xhr.onreadystatechange = function(){
                if(this.readyState == 4 && this.status == 201) {
                    if(this.status == 201){
                        let fileResponse = JSON.parse(this.response);
                        self.scope.fileList.push(fileResponse);
                    }else{
                        self.popup.notifyError('uploading error');
                    };
                    self.uploading = false;
                }else if(this.readyState == 1){
                    self.uploading = true;
                };
                self.scope.$apply();
            };
            xhr.open('POST', '/api/files/task-form', true);
            xhr.send(formData); 
        };
    }
};

fileUploadController.$inject = ['$scope','httpGeneral','popupNotifications'];

const fileUploadDirective = {
    template: require('./fileUpload.pug')(),
    name: 'fileUpload',
    controller: fileUploadController,
    controllerAs: 'fu',
    scope: {
        fileList: '='
    },
    link: fileUploadLink
};

function fileUploadLink(scope,element,attr,ctrl){

};

export {fileUploadDirective};