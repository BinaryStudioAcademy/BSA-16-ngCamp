import './userList.styl';

class userListController {
    constructor($scope,$rootScope){
        this.scope = $scope;
        this.rootScope = $rootScope;
    }

    info(){
        let self = this;
        console.log(self.scope);
    }

    $onInit(){
        let self = this;
    }
    close(){
        let self = this;
        self.scope.isShowed = false;
        setTimeout(function() {
          self.rootScope.$apply(function() {
          });
        }, 2000);
    }
};

userListController.$inject = ['$scope','$rootScope'];

const userListDirective = {
    template: require(`./userList-pug.directive.pug`)(),
    name: 'userList',
    controller: userListController,
    controllerAs: 'ulCtrl',
    transclude: true,
    scope: {
        userData: '=',
        selectCallback: '=',
        parentScope: '=',
        isShowed: '=isShowed'
    },
    link: userListlink
};

function userListlink(scope,element,attrs,ctrl){
    
}


export {userListDirective};