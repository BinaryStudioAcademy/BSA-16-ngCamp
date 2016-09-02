import './eventCreate.component.styl';

class eventEditController {
    constructor(popupNotifications,$location,httpGeneral,$window) {
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
    }
    $onInit(){
    	let self = this;
        self.projectParticipants = [];
        self.httpGeneral.sendRequest({
            type: "GET",
            url: "api/user"
        }).then(function(res) {
            self.users = res;
        });
    }
    save() {
        let self = this;
        let emptyParticipants = false;
        if (self.participants.length === 0){
            self.popupNotifications.notifyError("Participants is empty");
            emptyParticipants = true;
        }
        if (!emptyParticipants){
        self.httpGeneral.sendRequest({
            type: "POST",
            url: "api/event/",
            body: {
                data: {
                    title: self.title,
                    description: self.desc,
                    project:window._injectedData.currentProject,
                    participants: self.participants,
                    startDate: self.date,
                    endDate:self.endDate,
                    isAllDay:self.allDay,
                    author:window._injectedData.userId,
                }
            }
        }).then(function(res) {
            console.log("Succesfull create event");
            self.window.location.reload();
        	self.location.path('/');
        });
        }
    }

    participantUpdate() {
        let self = this;
        self.participantsSet.add(self.userToAdd);
        self.participants = Array.from(self.participantsSet);
    }

    getUserNameById(id) {
        let self = this;
        let user = self.users.find((element) => {
            return element._id === id;
        });

        return `${user.firstName} ${user.lastName}`;
    }

    participantDelete(id) {
        let self = this;
        self.participantsSet.delete(id);
        self.participants = Array.from(self.participantsSet);
    }

    open() {
        this.popup.opened = true;
    }
    open1() {
        this.popup1.opened = true;
    }
}

eventEditController.$inject = ['popupNotifications','$location','httpGeneral','$window'];

const eventCreateComponent = {
    controller: eventEditController,
    selector: 'eventCreateComponent',
    template: require('./eventCreate.component.pug')(),
};

export {
	eventCreateComponent
};