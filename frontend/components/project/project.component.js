import './project.component.styl';

class ProjectComponentController {
    constructor(popupNotifications, httpGeneral) {
        this.popupNotifications = popupNotifications;
        this.httpGeneral = httpGeneral;
        this.user = undefined;
        this.userReq = {
            type: "GET",
            url: "api/user/me",
        };
        this.projectsId = [];
        this.projects = [];
        this.flag = true;
        this.id = null;
        self.curentProjectId;
        self.curentProjectTitle;
    }
    getProjects() {
        let self = this;
        self.flag = false;
        self.httpGeneral.sendRequest(self.userReq).then(function(res) {
            self.user = res;
            self.projectsId = res.projects;
            self.projectsId.forEach(function(item) {
                self.httpGeneral.sendRequest({
                    type: 'get',
                    url: `api/projects/${item}`
                }).then(function(res) {
                    self.projects.push(res);
                });
            });
        });
    }

    setProject() {
        let self = this;
        self.curentProjectId;
        for (let proj in self.projects) {
            if (self.projects[proj].title === self.curentProjectTitle) {
                self.curentProjectId = self.projects[proj]._id;
                self.user.curentProject = self.projects[proj]._id;
            }
        };
        self.httpGeneral.sendRequest({
            type: "PUT",
            url: `api/user/${self.user._id}`,
            body: {
                curentProject: self.curentProjectId,
            }
        }).then(function(res) {
            //console.log("Succesfull update");
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