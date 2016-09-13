import './eventsStyles.styl';

class EventListComponentController {
    constructor(httpGeneral, $location) {
        this.httpGeneral = httpGeneral;
        this.location = $location;
        this.dtfrom = new Date();
        this.dtto = new Date();
        this.events = [];
        this.userEvents = [];
        this.popup1 = {
            opened: false

        };
        this.popup2 = {
            opened: false
        };
        this.participants = [];
    }
    open1() {
        this.popup1.opened = true;
    }
    open2() {
        this.popup2.opened = true;
        console.log('opned');
    }
    $onInit() {
        let self = this;
        self.userEvents = [];
        self.httpGeneral.sendRequest({
            type: "GET",
            url: "api/event"
        }).then(function(res) {
            self.events = res;
            for (let event in self.events) {
                if (self.events[event].project === window._injectedData.currentProject) {
                  self.userEvents.push(self.events[event]);
                };
            };
        });
    }
    filter() {
        let self = this;
        self.userEvents = [];
        self.httpGeneral.sendRequest({
            type: "GET",
            url: `api/event/from/${self.dtfrom}/to/${self.dtto}`
        }).then(function(res) {
            self.events = res;
            if (self.events != undefined) {
                for (let event in self.events) {
                    if (self.events[event].project === window._injectedData.currentProject) {
                      self.userEvents.push(self.events[event]);
                    };
                };
            }
        });
    }
    isAuthor(event){
        let self = this;
        console.log(event.author,window._injectedData.userId);
        let ans = false;
        if (event.author === window._injectedData.userId) ans = true;
        return ans;
    }
}

EventListComponentController.$inject = ['httpGeneral', '$location'];

const eventListComponent = {
    controller: EventListComponentController,
    controllerAs: 'vm',
    selector: 'eventList',
    template: require('./eventList.component.pug')(),
};

export {
    eventListComponent
};