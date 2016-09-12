import './filesWrapper.style.styl';

class fileWrapperController{
    constructor($scope,httpGeneral,popupNotifications){
        this.scope = $scope;
        this.modalToggle = false;
        this.http = httpGeneral;
        this.popup = popupNotifications;
    }

    toggle(){
        this.modalToggle = !this.modalToggle;
    }

    transformSize(size){
        return `${(size/1048576).toFixed(2)} MB`;
    }

    idArray(){
        return (this.scope.files.map(function(elem){return elem._id;})).join();
    }

}

fileWrapperController.$inject = ["$scope","httpGeneral","popupNotifications"];

const filesWrapperDirective = {
    template: require('./filesWrapper.template.pug')(),
    name: 'fileWrapper',
    controller: fileWrapperController,
    controllerAs: 'fw',
    scope: {
        files: '=',
        sourceId: '='
    },
    link: fileWrapperLink
};

function fileWrapperLink(scope,element,attr,ctrl){

};

export {filesWrapperDirective};