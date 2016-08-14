import './project.component.styl';

class ProjectComponentController {
    constructor(popupNotifications, httpGeneral) {
        this.popupNotifications = popupNotifications;
        this.httpGeneral = httpGeneral;
        this.user = {
            type: "GET",
            url: "api/user/me",
        };
        this.projects = [];
        this.flag = true;
        this.id = null;
    }
    getProjects() {
        let self = this;
        self.flag = false;
        self.httpGeneral.sendRequest(self.user).then(function(res) {
            console.log(res);
            self.projects=res.projects;
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