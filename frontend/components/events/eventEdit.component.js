import './eventEdit.component.styl';

class eventEditController {
    constructor(popupNotifications, $location, httpGeneral, $window) {
        this.popupNotifications = popupNotifications;
        this.httpGeneral = httpGeneral;
        this.window = $window;
        this.location = $location;
        this.files = [];
        this.title;
        this.date = new Date();
        this.endDate = new Date();
        this.desc;
        this.allDay = false;
        this.participants = [];
        this.participantsSet = new Set();
        this.users;
        this.popup = {
            opened: false
        };
        this.popup1 = {
            opened: false
        };
        this.today;
        this.userToAdd;
        this.curEvent;
        this.editTitle = false;
        this.editDescription = false;
        this.editEndDate = false;
        this.editStartDate = false;
        this.userListFlag = false;
        this.invalidForm = false;
        this.tinyOptions = {
            inline: true,
            theme: 'inlite',
            plugins: 'image link paste contextmenu textpattern autolink lists',
            insert_toolbar: false,
            selection_toolbar: 'bold italic | quicklink h2 h3 blockquote | bullist numlist outdent indent',
            selector: '.descEditor'
        };
    }

    edit(prop) {
        let self = this;
        switch (prop) {
            case "title":
            {
                self.editTitle = false;
                self.curEvent.title = self.title;
                break;
            }
            case "description":
            {
                self.editDescription = false;
                self.curEvent.description = self.desc;
                break;
            }
            case "startDate":
            {
                self.editStartDate = false;
                self.curEvent.startDate = self.date;
                break;
            }
            case "endDate":
            {
                self.editEndDate = false;
                self.curEvent.endDate = self.endDate;
                break;
            }
            case "participants":
            {
            }
        }
    }

    onUserSelect(user) {
        function filterArrayUsers(element) {
            let eq;
            if (element._id == user._id) {
                eq = true;
            } else {
                eq = false;
            }
            ;
            return eq;
        };
        let self = this.parentScope;
        let repeat = self.participants.find(filterArrayUsers);

        if (repeat) {
            self.popupNotifications.notifyError('already added!');
        } else {
            self.participants.push(user);
        }
        ;

        self.userListFlag = false;
    }

    $onInit() {
        let self = this;
        let userReq = {
            type: "GET",
            url: `/api/projects/${window._injectedData.currentProject}/withUsers`,
            errorCallback(){
                self.popupNotifications.notifyError('Proj. Participants load error!');
            }
        };
        self.httpGeneral.sendRequest(userReq).then(function (res) {
            self.users = res.participants;
        });
    }

    $routerOnActivate(next) {
        let self = this;
        self.httpGeneral.sendRequest({
            type: "GET",
            url: `api/event/${next.params.id}/participants`
        }).then(function (res) {
            self.curEvent = res;
            self.title = res.title;
            self.desc = res.description;
            self.author = res.author;
            self.participants = res.participants;
            console.log(self.participants);
        });
    }

    save(valid) {
        let self = this;
        if (valid) {
            self.httpGeneral.sendRequest({
                type: "PUT",
                url: `api/event/${self.curEvent._id}`,
                body: {

                    title: self.title,
                    description: self.desc,
                    files: self.files,
                    project: window._injectedData.currentProject,
                    participants: self.participants.map((elem)=> {
                        return elem._id;
                    }),
                    startDate: self.date,
                    endDate: self.endDate,
                    isAllDay: self.allDay,

                }
            }).then(function (res) {
                console.log("Succesfull create event");
                self.location.path('/events');
            });
        } else {
            this.invalidForm = true;
            self.popupNotifications.notifyError("Please enter info correctly");
        }
    }

    delete() {
        let self = this;
        self.httpGeneral.sendRequest({
            type: "DELETE",
            url: `api/event/${self.curEvent._id}`,
        }).then(function (res) {
            self.window.location.reload();
            self.location.path('/events');
        });
    }


    getUserNameById(id) {
        let self = this;
        if (self.users) {
            let user = self.users.find((element) => {
                return element._id === id;
            });
            return `${user.firstName} ${user.lastName}`;
        }
        ;
    }

    participantDelete(user) {
        let self = this;
        self.participants.forEach((elem, index, arr)=> {
            if (user._id == elem._id) {
                arr.splice(index, 1);
            }
        });
    };

    open() {
        this.popup.opened = true;
    }

    open1() {
        this.popup1.opened = true;
    }
}

eventEditController.$inject = ['popupNotifications', '$location', 'httpGeneral', '$window'];

const eventEditComponent = {
    controller: eventEditController,
    selector: 'eventEditComponent',
    template: require('./eventEdit.component.pug')(),
};

export {
    eventEditComponent
};