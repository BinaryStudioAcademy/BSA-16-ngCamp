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
        this.currentProject = window._injectedData.currentProject;
        this.projectParticipators;
        this.addParticipatorFlag = false;
        this.participatorToAdd;
        this.users;
        this.projectParticipants = [];
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

    $onInit() {
        let self = this;
        self.httpGeneral.sendRequest({
            type: "GET",
            url: "api/user"
        }).then(function(res) {
            self.users = res;
        });
        self.httpGeneral.sendRequest({
            type: "GET",
            url: `api/projects/${window._injectedData.currentProject}`,
        }).then(function(res) {
            for (let part in res.participants)
                for (let user in self.users) {
                    if (res.participants[part] === self.users[user]._id)
                        self.projectParticipants.push(`${self.users[user].firstName}${self.users[user].lastName}`);
                }
        });
    }

    addParticipator() {
        let self = this;
        for (let user in self.users) {
            if (self.users[user].email === self.participatorToAdd)
                self.httpGeneral.sendRequest({
                    type: "POST",
                    url: `api/projects/${self.currentProject}/participants`,
                    body: {
                        data: [self.users[user]._id],
                    },
                }).then(function(res) {
                    console.log("Succesfull add participator");
                });
        }
        self.addParticipatorFlag = false;
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