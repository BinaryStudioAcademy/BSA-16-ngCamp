import './headerStyles.styl';

class HeaderComponentController {
    constructor(httpGeneral,$location) {
        this.httpGeneral = httpGeneral;
        this.location = $location;
        this.userProjects;
        this.currentProjectId;
        this.userReq = {
            type: "GET",
            url: "api/projects/forCurrentUser",
        };
    }
    $onInit(){
    	let self = this;
    	self.httpGeneral.sendRequest(self.userReq).then(function(res) {
            self.userProjects = res;
        });
        self.httpGeneral.sendRequest({
                type: "GET",
                url: `api/projects/${window._injectedData.currentProject}/withUsers`,
            }).then(function(res) {
                self.currentProject = res;
            });
    }
    setProject(){
    	let self = this;
    	window._injectedData.currentProject = self.currentProjectId;

        self.httpGeneral.sendRequest({
            type: "PUT",
            url: `api/user/${window._injectedData.userId}`,
            body: {
                currentProject: self.currentProjectId,
            }
        }).then(function(res) {
        	self.location.path('/');
            //console.log("Succesfull update currentProject");
        });
    }
}	

HeaderComponentController.$inject = ['httpGeneral','$location'];

const headerComponent = {
    controller: HeaderComponentController,
    selector: 'headerComponent',
    template: require('./header-pug.component.pug')()
};

export {
    headerComponent
};