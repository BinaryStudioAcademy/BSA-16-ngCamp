import './project.component.styl';

class ProjectComponentController {

    constructor(popupNotifications, httpGeneral, $location, $window,$rootRouter,$rootScope, $timeout) {

        this.popupNotifications = popupNotifications;
        this.httpGeneral = httpGeneral;
        this.timeout = $timeout;
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
        this.userListFlag = false;
        this.adminListFlag = false;
        this.rootScope = $rootScope;
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

    onUserSelect(user){
        function filterArrayUsers(element){
            let eq;
            if( element._id == user._id ){
                eq = true;
            }else{
                eq = false;
            };
            return eq;
        };
        let self = this.parentScope;
        let repeat = self.projectParticipants.find(filterArrayUsers);

        if(repeat){
            self.popupNotifications.notifyError('already added!');
        }else{
            //self.projectParticipants.push(user);
            self.participatorToAdd = user;
            self.addParticipator();
        };

        self.userListFlag = false;
    }

    onAdminSelect(user){
        function filterArrayUsers(element){
            let eq;
            if( element._id == user._id ){
                eq = true;
            }else{
                eq = false;
            };
            return eq;
        };
        let self = this.parentScope;
        let repeat = self.projectAdmins.find(filterArrayUsers);
        if(repeat){
            self.popupNotifications.notifyError('already added!');
        }else{
            //self.projectAdmins.push(user);
            self.adminToAdd = user;
            self.addAdmin();
        };

        self.adminListFlag = false;
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
                            self.rootScope.$broadcast('menuReload');
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
            self.rootRouter.navigate(['NoProject']);
            self.rootScope.$broadcast('menuReload');
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

    editNameActivate(){
        let self = this;
        if(self.isUserAdmin){
            self.editName = true;
            self.timeout(function(){
                window.document.querySelector("#projTitleInput").focus();
            },0,true);
        }
    }
}

ProjectComponentController.$inject = ['popupNotifications', 'httpGeneral', '$location', '$window','$rootRouter','$rootScope','$timeout'];

const projectComponent = {
    controller: ProjectComponentController,
    selector: 'projectComponent',
    template: require('./project.component.pug')(),
    controllerAs: 'proj',
};


export {
    projectComponent
};