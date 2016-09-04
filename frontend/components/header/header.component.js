import './headerStyles.styl';

class HeaderComponentController {
    constructor(httpGeneral, $location, $rootRouter) {
        this.httpGeneral = httpGeneral;
        this.location = $location;
        this.rootRouter = $rootRouter;
        this.userProjects;
        this.currentProjectId = window._injectedData.currentProject || '';
        this.userReq = {
            type: "GET",
            url: "api/projects/forCurrentUser",
        };
    }
    $onInit() {
        let self = this;
        self.httpGeneral.sendRequest(self.userReq).then(function (res) {
            self.userProjects = res;
        });
        self.httpGeneral.sendRequest({
            type: "GET",
            url: `api/projects/${window._injectedData.currentProject}/withUsers`,
        }).then(function (res) {
            self.currentProject = res;
        });
    }
    setProject() {
        let self = this;
        window._injectedData.currentProject = self.currentProjectId;

        self.httpGeneral.sendRequest({
            type: "PUT",
            url: `api/user/${window._injectedData.userId}`,
            body: {
                currentProject: self.currentProjectId,
            }
        }).then(function (res) {
            // let currPath = self.location.path();
            let newReg = /^(\/)[^(\/)]*/;
            // self.location.path("/"+currPath.match(newReg)[0]);
            let currPath = self.rootRouter.lastNavigationAttempt.match(newReg)[0];
            self.rootRouter.navigate(['NotFound']);
            self.rootRouter.navigateByUrl(currPath);
            //console.log("Succesfull update currentProject");
        });
    }
}

HeaderComponentController.$inject = ['httpGeneral', '$location', '$rootRouter'];

const headerComponent = {
    controller: HeaderComponentController,
    selector: 'headerComponent',
    template: require('./header-pug.component.pug')(),
    controllerAs: 'head'
};

export {
    headerComponent
};
