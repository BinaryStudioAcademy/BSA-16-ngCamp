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
        this.userListFlag = false;
    }
    $onInit(){
    	let self = this;
        self.projectParticipants = [];
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
    save(valid) {
        let self = this;
        let emptyParticipants = false;
        let badDate = false;
        if (self.participants.length === 0){
            self.popupNotifications.notifyError("Participants is empty");
            emptyParticipants = true;
        }
        if (self.startDate>self.endDate || self.startDate < new Date() || self.endDate < new Date()){
            self.popupNotifications.notifyError('You set date incorrectly');
            badDate = true;
        }
        if (!emptyParticipants && valid && !badDate){
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
        	self.location.path('/events');
        });
        } else{
            self.popupNotifications.notifyError("Please enter info correctly");
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
            self.participants.push(user);
        };

        self.userListFlag = false;
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