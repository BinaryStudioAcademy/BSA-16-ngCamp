import './menuStyles.styl';

class MenuComponentController {
    constructor(httpGeneral,$location,$rootRouter,$scope) {
        this.http = httpGeneral;
        this.disabled = true;
        this.location = $location;
        this.rootRouter = $rootRouter;
        this.scope = $scope;
        this.userProjects;
    }

    $onInit(){
        let self = this;
        self.scope.$on('menuReload', function(){
            self.$onInit();
        });
        if (!window._injectedData.currentProject){
            self.disabled = false;
        }else{
            self.disabled = true;
        };
        let userReq = {
            type: "GET",
            url: "api/projects/forCurrentUser",
        };
        self.http.sendRequest(userReq).then(function(res) {
            self.userProjects = res;
        });

    }
    showMenu(){

    	let x = document.getElementById("side-menu");
    	if (x.className === "side-menu") {
        	x.className += " show";
    	} else {
          	x.className = "side-menu";
    	}
    }
    hideMenu(){
        let x = document.getElementById("side-menu");
        x.className += "hide";
    }

    setProject(projId) {
        let self = this;
        if(projId === window._injectedData.currentProject){
            return false;
        };
        window._injectedData.currentProject = projId;
        self.http.sendRequest({
            type: "PUT",
            url: `api/user/${window._injectedData.userId}`,
            body: {
                currentProject: projId,
            }
        }).then(function(res) {
            self.$onInit();
            // let currPath = self.location.path();
            if (self.location.path() === '/noProject' && window._injectedData.currentProject != undefined) {
                self.rootRouter.navigate(['MainPage']);
            } else {
                let newReg = /^(\/)[^(\/)]*/;
                // self.location.path("/"+currPath.match(newReg)[0]);
                let currPath = self.rootRouter.lastNavigationAttempt.match(newReg)[0];
                //console.log(currPath);
                self.rootRouter.navigate(['NotFound']);
                self.rootRouter.navigateByUrl(currPath);
                //console.log("Succesfull update currentProject");
            }
        });
        self.showMenu();
    }

    projEq(id){
        return (id === window._injectedData.currentProject);
    }
}

MenuComponentController.$inject = ["httpGeneral","$location","$rootRouter","$scope"];

const menuComponent = {
    controller: MenuComponentController,
    controllerAs: 'MenuCtrl',
    selector: 'menuComponent',
    template: require('./menu-pug.component.pug')()
};

export {
    menuComponent
};