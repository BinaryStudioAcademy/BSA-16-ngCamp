import './project.component.styl';

class ProjectComponentController {

    constructor(popupNotifications, httpGeneral, $location, $window,$rootRouter) {

        this.popupNotifications = popupNotifications;
        this.httpGeneral = httpGeneral;
        this.window = $window;
        this.userProjects;
        this.rootRouter = $rootRouter;
        this.userReq = {
            type: "GET",
            url: "api/projects/forCurrentUser",
        };
        this.location = $location;
        this.flag = true;
        this.id = null;
        this.currentProjectId = window._injectedData.currentProject || '';
        this.currentProject;
        this.projectParticipators;
        this.addParticipatorFlag = false;
        this.participatorToAdd;
        this.participatorToDelete;
        this.users;
        this.projectParticipants = [];
        this.projectAdmins = [];
        this.editName = false;
        this.editDesc = false;
        this.popup = {
            opened: false
        };
        this.today;
        this.dtDeadline = new Date();
        this.editDeadline = false;
        this.modalFlag = false;
        this.isUserAdmin = false;
        this.datePickerOpt = {
            minDate: new Date()
        };
    }

    isAdmin() {
        let self = this;
        for (let i = 0; i < self.projectAdmins.length; i++) {
            if (self.projectAdmins[i]._id === window._injectedData.userId) self.isUserAdmin = true;
        }
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
                self.projectAdmins = res.admins;
                self.dtDeadline = res.endDate;
                self.isAdmin();
            });
        });
        if (window._injectedData.currentProject === undefined) {
            self.rootRouter.navigateByUrl('/noProject');
        }
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
            self.participatorToAdd = "";
        });
        self.addParticipatorFlag = false;
        this.$onInit();
    }

    removeParticipant(participator) {
        let self = this;
        self.httpGeneral.sendRequest({
            type: "DELETE",
            url: `api/projects/${self.currentProjectId}/participants/${participator}`,
        }).then(function(res) {
            console.log("Succesfull delete participator");
        });
        this.$onInit();
    }

    addAdmin() {
        let self = this;
        let duplicateAdmin = false;
        for (let i in self.projectAdmins) {
            if (self.projectAdmins[i]._id === self.adminToAdd) {
                duplicateAdmin = true;
            }
        }
        if (!duplicateAdmin) {
            self.projectAdmins.push(self.adminToAdd);
            self.httpGeneral.sendRequest({
                type: "PUT",
                url: `api/projects/${self.currentProjectId}`,
                body: {
                    admins: self.projectAdmins,
                },
            }).then(function(res) {
                console.log("Succesfull add participator");
                self.adminToAdd = "";
            });
        }
        self.addAdminFlag = false;
        this.$onInit();
    }

    removeAdmin(participator) {
        let self = this;
        self.httpGeneral.sendRequest({
            type: "DELETE",
            url: `api/projects/${self.currentProjectId}/admins/${participator}`,
        }).then(function(res) {
            console.log("Succesfull delete participator");
        });
        this.$onInit();
    }

    edit(prop, valid) {
        let self = this;
        if (valid || prop === "deadline") {
            switch (prop) {
                case "title":
                    {
                        self.editName = false;
                        self.httpGeneral.sendRequest({
                            type: "PUT",
                            url: `api/projects/${self.currentProjectId}`,
                            body: {
                                title: self.currentProject.title,
                            }
                        }).then(function(res) {
                            console.log("Succesfull edit title");
                            self.popupNotifications.notifySuccess("You change title Succesfully");
                        });
                        break;
                    }
                case "description":
                    {
                        self.editDesc = false;
                        self.httpGeneral.sendRequest({
                            type: "PUT",
                            url: `api/projects/${self.currentProjectId}`,
                            body: {
                                description: self.currentProject.description,
                            }
                        }).then(function(res) {
                            console.log("Succesfull edit description");
                            self.popupNotifications.notifySuccess("You change description Succesfully");
                        });
                        break;
                    }
                case "deadline":
                    {
                        self.editDeadline = false;
                        self.httpGeneral.sendRequest({
                            type: "PUT",
                            url: `api/projects/${self.currentProjectId}`,
                            body: {
                                endDate: self.dtDeadline,
                            }
                        }).then(function(res) {
                            console.log("Succesfull edit deadline");
                            self.popupNotifications.notifySuccess("You change deadline Succesfully");
                        });
                        this.$onInit();
                        break;
                    }
            }
        } else {
            self.popupNotifications.notifyError("Please enter new info correctrly");
        }
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
            self.window.location.reload();
            self.location.path('/');
        });
    }
    today() {
        this.dt = new Date();
    };
    open() {
        this.popup.opened = true;
    }
    localDate(date) {
        let newDate = new Date(date);
        return newDate.toLocaleDateString();
    }
}

ProjectComponentController.$inject = ['popupNotifications', 'httpGeneral', '$location', '$window','$rootRouter'];

const projectComponent = {
    controller: ProjectComponentController,
    selector: 'projectComponent',
    template: require('./project.component.pug')(),
    controllerAs: 'proj',
};


export {
    projectComponent
};