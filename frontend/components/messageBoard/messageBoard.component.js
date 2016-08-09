import './messageBoard.styl';

class messageBoardController {
    constructor(httpGeneral) {
        this.http = httpGeneral;
    }

    onClick() {
        alert("CLICKED");
    }

}

const messageBoardComponent = {
    controller: messageBoardController,
    controllerAs: 'msgBoard',
    template: require('./messageBoard.pug')(),
    selector: 'messageBoard'
};

messageBoardController.$inject = ['httpGeneral'];

export {messageBoardComponent};



//angular
//    .module('base')
//    .component('messageBord', {
//        templateUrl: require('./messageBoard.pug')(),
//        restrict: 'E',
//        controller: MessageBoxCtrl,
//        controllerAs: 'message'
//    });
//
//function MessageBoxCtrl() {
//    let vm = this;
//}
//
//require('./messageBord.styl');