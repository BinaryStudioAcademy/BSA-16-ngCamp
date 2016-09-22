import './commentsModal.style.styl';

class commentsModalController{
    constructor($scope,httpGeneral,popupNotifications){
        this.scope = $scope;
        this.modalToggle = false;
        this.http = httpGeneral;
        this.popup = popupNotifications;
    }

    toggle(){
        this.modalToggle = !this.modalToggle;
    }


}

commentsModalController.$inject = ["$scope","httpGeneral","popupNotifications"];

const commentsModalDirective = {
    template: require('./commentsModal.template.pug')(),
    name: 'commentsModal',
    controller: commentsModalController,
    controllerAs: 'cm',
    scope: {
        comments: '=',
        instanceType: '='
    },
    link: commentsModalLink
};

function commentsModalLink(scope,element,attr,ctrl){

};

export {commentsModalDirective};