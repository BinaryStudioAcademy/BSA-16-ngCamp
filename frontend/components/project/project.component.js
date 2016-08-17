import './project.component.styl';

class ProjectComponentController {
    constructor(popupNotifications, httpGeneral,$location) {
        this.popupNotifications = popupNotifications;
        this.httpGeneral = httpGeneral;
        this.location = $location;
        this.userProjects;
        this.userReq = {
            type: "GET",
            url: "api/projects/forCurrentUser",
        };
        this.flag = true;
        this.id = null;
        this.currentProject = window._injectedData.currentProject || '';
        this.modalFlag = false;
    }

    getProjects() {
        let self = this;
        self.flag = false;
        self.httpGeneral.sendRequest(self.userReq).then(function(res) {
            self.userProjects = res;
        });
    }

    setProject() {
        let self = this;
        
        window._injectedData.currentProject = self.currentProject;

        self.httpGeneral.sendRequest({
            type: "PUT",
            url: `api/user/${window._injectedData.userId}`,
            body: {
                currentProject: self.currentProject,
            }
        }).then(function(res) {
            //console.log("Succesfull update currentProject");
        });
    }

    modalToggle() {
        this.modalFlag = !this.modalFlag;
    }

    deleteProject() {
        let self = this;
        self.httpGeneral.sendRequest({
            type: "DELETE",
            url: `api/projects/${window._injectedData.currentProject}`
        }).then(() => {
            window._injectedData.currentProject = '';
            self.location.path('/');
        });
    }
}

ProjectComponentController.$inject = ['popupNotifications', 'httpGeneral','$location'];

const projectComponent = {
    controller: ProjectComponentController,
    selector: 'projectComponent',
    template: require('./project.component.pug')(),
    controllerAs: 'proj',
};


export {
    projectComponent
};