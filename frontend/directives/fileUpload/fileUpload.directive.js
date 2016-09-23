import './fileUpload.styl';

class fileUploadController{
    constructor($scope,httpGeneral,popupNotifications){
        this.scope = $scope;
        this.http = httpGeneral;
        this.popup = popupNotifications;
        this.uploading = false;
        this.uploadProgress;
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
        self.uploadProgress = 0;
        let oldGap = {time: new Date(),data: 0};
        let newGap = {};
        let file = files[0];
        if(file){
            let formData = new FormData();
            formData.append('file', file);
            let xhr = new XMLHttpRequest;
            xhr.upload.onprogress = (event) => {
                newGap.time = new Date();
                newGap.data = event.loaded;
                console.log(newGap);
                console.log(oldGap);
                self.timeLeft = Math.round(((event.total - event.loaded)/((newGap.data-oldGap.data)/(newGap.time.getTime()-oldGap.time.getTime())))/1000);
                if(self.timeLeft > 3600){
                    self.timeLeft = `${Math.round(self.timeLeft/3600)} hours`;
                }else if(self.timeLeft > 90){
                    self.timeLeft = `${Math.round(self.timeLeft/60)} minutes`;
                }else if(self.timeLeft > 25){
                    self.timeLeft = `${self.timeLeft} seconds`;
                }else{
                    self.timeLeft = 0;
                }
                self.timeLeft = self.timeLeft ? `(~${self.timeLeft} left)` : '';
                oldGap = Object.assign({}, newGap);
                self.uploadProgress = event.loaded/event.total;
                self.scope.$apply();
            };
            xhr.onreadystatechange = function(){
                if(this.readyState == 4) {
                    if(this.status == 201){
                        let fileResponse = JSON.parse(this.response);
                        self.scope.fileList.push(fileResponse);
                    }else{
                        self.popup.notifyError('uploading error');
                    };
                    self.uploadProgress = 0;
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