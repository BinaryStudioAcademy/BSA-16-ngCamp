import './createProject.component.styl';

class createProjectController {
    constructor(httpGeneral, $location, $window, popupNotifications) {
        this.http = httpGeneral;
        this.location = $location;
        this.window = $window;
        this.popupNotifications = popupNotifications;
        this.projectTitle;
        this.projectDescription;
        this.participants = [],
        this.participantsSet = new Set();
        this.adminsSet = new Set();
        this.users;
        this.status = "active";
        this.popup = {
            opened: false
        };
        this.today;
        this.deadline = new Date();
        this.modalFlag = false;
        this.userToAdd;
        this.addParticipatorFlag = false;
        this.admins;
        this.addAdminFlag = false;
        this.adminToAdd;
        this.datePickerOpt = {
            minDate: new Date()
        };
        this.projects = [];
    }

    $routerOnActivate() {
        let self = this;
        self.http.sendRequest({
            type: "GET",
            url: "api/projects"
        }).then(function(res) {
            self.projects = res;
        });
        self.participantsSet.add(window._injectedData.userId);
        self.participants = Array.from(self.participantsSet);
        self.adminsSet.add(window._injectedData.userId);
        self.admins = Array.from(self.adminsSet);
    }

    $onInit() {
        let self = this;
        self.projectParticipants = [];
        self.http.sendRequest({
            type: "GET",
            url: "api/user"
        }).then(function(res) {
            self.users = res;
            self.userToAdd = self.users[0]._id;
        });
    }

    save(valid) {
        let self = this;
        self.participantsSet.add(window._injectedData.userId);
        self.participants = Array.from(self.participantsSet);
        self.adminsSet.add(window._injectedData.userId);
        self.admins = Array.from(self.adminsSet);
        let duplicateTitle = false;
        let clearDateField = false;
        if (self.projects != undefined) {
            for (let i = 0; i < self.projects.length; i++) {
                if (self.projects[i].title === self.projectTitle && self.projects[i].status === "active") {
                    self.popupNotifications.notifyError("Project with this title is already created");
                    duplicateTitle = true;
                    break;
                }
            }
        }
        if (self.deadline === undefined) {
            self.popupNotifications.notifyError("You must pick deadline date");
            clearDateField = true;
        }
        if(!valid){
            self.popupNotifications.notifyError("Please enter info correctrly");
        }
        if (!duplicateTitle && !clearDateField && valid) {
            self.http.sendRequest({
                type: "POST",
                url: "api/projects/",
                body: {
                    data: {
                        title: self.projectTitle,
                        description: self.projectDescription,
                        participants: self.participants,
                        endDate: self.deadline,
                        startDate: new Date(),
                        status: 'active',
                        admins: self.admins,
                    }
                }
            }).then(function(res) {
                console.log("Succesfull create project");
                self.window.location.reload();
                self.location.path('/');
            });
        }
    }

    participantUpdate() {
        let self = this;
        self.participantsSet.add(self.userToAdd);
        self.participants = Array.from(self.participantsSet);
        self.addParticipatorFlag = false;
        self.userToAdd = 0;
    }

    getUserNameById(id) {
        let self = this;
        let user = self.users.find((element) => {
            return element._id === id;
        });

        return `${user.firstName} ${user.lastName || ""}`;
    }


    participantDelete(id) {
        let self = this;
        console.log(id);
        self.participantsSet.delete(id);
        self.participants = Array.from(self.participantsSet);
        self.userToAdd = 0;
    }

    adminUpdate() {
        let self = this;
        self.adminsSet.add(self.adminToAdd);
        self.admins = Array.from(self.adminsSet);
        self.addAdminFlag = false;
        self.participantsSet.add(self.adminToAdd);
        self.participants = Array.from(self.participantsSet);
        self.adminToAdd = 0;
    }


    adminDelete(id) {
        let self = this;
        self.addAdminFlag = false;
        self.adminsSet.delete(id);
        self.admins = Array.from(self.adminsSet);
        self.adminToAdd = 0;
    }

    modalToggle() {
        this.modalFlag = !this.modalFlag;
    }
    today() {
        this.dt = new Date();
    };
    open() {
        this.popup.opened = true;
    }
}

createProjectController.$inject = [
    'httpGeneral',
    '$location',
    '$window',
    'popupNotifications',
];

const createProjectComponent = {
    controller: createProjectController,
    selector: 'createProjectComponent',
    template: require('./createProject-pug.component.pug')(),
    controllerAs: 'createProj'
};

export {
    createProjectComponent
};