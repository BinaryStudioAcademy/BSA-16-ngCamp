import './project.component.styl';

class ProjectComponentController {
    constructor(popupNotifications, httpGeneral) {
        this.popupNotifications = popupNotifications;
        this.httpGeneral = httpGeneral;
        this.user = {
            type: "GET",
            url: "api/user/me",
        };
        this.projectsId = [];
        this.projects = [];
        this.flag = true;
        this.id = null;
    }
    getProjects() {
        let self = this;
        self.flag = false;
        self.httpGeneral.sendRequest(self.user).then(function(res) {
            console.log(res);
            self.projectsId=res.projects;
            self.projectsId.forEach(function(item){
                self.httpGeneral.sendRequest({type: 'get',url: `api/projects/${item}`}).then(function(res){
                    self.projects.push(res);
                });
            });
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