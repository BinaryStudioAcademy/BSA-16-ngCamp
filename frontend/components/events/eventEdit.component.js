import './eventEdit.component.styl';

class eventEditController {
    constructor(popupNotifications, $location, httpGeneral, $window) {
        this.popupNotifications = popupNotifications;
        this.httpGeneral = httpGeneral;
        this.window = $window;
        this.location = $location;
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
                {}
        }
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
        let repeat = self.participants.find(filterArrayUsers);

        if(repeat){
            self.popupNotifications.notifyError('already added!');
        }else{
            self.participants.push(user._id);
            self.userToAdd = user._id;
            self.participantUpdate();
        };

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
        self.httpGeneral.sendRequest(userReq).then(function(res){
            self.users = res.participants;
        });
    }
    $routerOnActivate(next) {
        let self = this;
        self.httpGeneral.sendRequest({
            type: "GET",
            url: `api/event/${next.params.id}`
        }).then(function(res) {
            self.curEvent = res;
            self.title = res.title;
            self.desc = res.description;
            self.author = res.author;
            console.log(res.author);
            for (let part in res.participants) {
                self.participantsSet.add(res.participants[part]);
                self.participants = Array.from(self.participantsSet);
            };
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
                    project: window._injectedData.currentProject,
                    participants: self.participants,
                    startDate: self.date,
                    endDate: self.endDate,
                    isAllDay: self.allDay,

                }
            }).then(function(res) {
                console.log("Succesfull create event");
                self.location.path('/events');
            });
        }else{
            self.popupNotifications.notifyError("Please enter info correctly");
        }
    }

    delete() {
        let self = this;
        self.httpGeneral.sendRequest({
            type: "DELETE",
            url: `api/event/${self.curEvent._id}`,
        }).then(function(res) {
            self.window.location.reload();
            self.location.path('/events');
        });
    }

    participantUpdate() {
        let self = this;
        self.participantsSet.add(self.userToAdd);
        self.participants = Array.from(self.participantsSet);
        self.edit('participants');
    }

    getUserNameById(id) {
        let self = this;
        if (self.users) {
            let user = self.users.find((element) => {
                return element._id === id;
            });
            return `${user.firstName} ${user.lastName}`;
        };
    }

    participantDelete(id) {
        let self = this;
        self.participantsSet.delete(id);
        self.participants = Array.from(self.participantsSet);
        self.edit('participants');
    }

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