import './project.component.styl';

class ProjectComponentController {
    constructor(popupNotifications, httpGeneral) {
        this.popupNotifications = popupNotifications;
        this.httpGeneral = httpGeneral;
        this.userProjects;
        this.userReq = {
            type: "GET",
            url: "api/projects/forCurrentUser",
        };
        this.flag = true;
        this.id = null;
        this.currentProject=window._injectedData.currentProject;
        this.currentProjectTitle;
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
        for (let proj in self.userProjects) {
            if (self.userProjects[proj].title === self.currentProjectTitle) {
                self.currentProject = self.userProjects[proj]._id;
            }
        };
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
}

ProjectComponentController.$inject = ['popupNotifications', 'httpGeneral'];

const projectComponent = {
    controller: ProjectComponentController,
    selector: 'projectComponent',
    template: require('./project.component.pug')(),
    controllerAs: 'proj',
};


export {
    projectComponent
};