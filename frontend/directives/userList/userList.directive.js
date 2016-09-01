import './userList.styl';

class userListController {
    constructor($scope){
        this.scope = $scope;
    }

    info(){
        let self = this;
        console.log(self.scope);
    }

};

userListController.$inject = ['$scope'];

const userListDirective = {
    template: require(`./userList-pug.directive.pug`)(),
    name: 'userList',
    controller: userListController,
    controllerAs: 'ulCtrl',
    transclude: true,
    scope: {
        userData: '=',
        selectCallback: '=',
        parentScope: '='
    },
    link: userListlink
};

function userListlink(scope,element,attr,ctrl){
}


export {userListDirective};