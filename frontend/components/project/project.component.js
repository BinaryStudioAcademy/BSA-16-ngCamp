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
        this.currentProjectId = window._injectedData.currentProject;
        this.currentProject;
        this.projectParticipators;
        this.addParticipatorFlag = false;
        this.participatorToAdd;
        this.participatorToDelete;
        this.users;
        this.projectParticipants = [];
    }

    $onInit() {
        let self = this;
        self.projectParticipants = [];
        self.httpGeneral.sendRequest({
            type: "GET",
            url: "api/user"
        }).then(function(res) {
            self.users = res;
            self.httpGeneral.sendRequest({
                type: "GET",
                url: `api/projects/${window._injectedData.currentProject}/withUsers`,
            }).then(function(res) {
                self.currentProject = res;
                self.projectParticipants = res.participants;
            });
        });
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

        window._injectedData.currentProject = self.currentProjectId;

        self.httpGeneral.sendRequest({
            type: "PUT",
            url: `api/user/${window._injectedData.userId}`,
            body: {
                currentProject: self.currentProjectId,
            }
        }).then(function(res) {
            //console.log("Succesfull update currentProject");
        });
        this.$onInit();
    }

    addParticipator() {
        let self = this;
        self.httpGeneral.sendRequest({
            type: "POST",
            url: `api/projects/${self.currentProjectId}/participants`,
            body: {
                data: [self.participatorToAdd],
            },
        }).then(function(res) {
            console.log("Succesfull add participator");
        });
        self.addParticipatorFlag = false;
        this.$onInit();
    }

    removeParticipant(participator) {
        let self = this;
        for (let user in self.users)
            if (self.users[user].email === participator) {
                self.httpGeneral.sendRequest({
                    type: "DELETE",
                    url: `api/projects/${self.currentProjectId}/participants/${self.users[user]._id}`,
                }).then(function(res) {
                    console.log("Succesfull delete participator");
                });
            }
        this.$onInit();
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