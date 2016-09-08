import './eventsStyles.styl';

class EventsComponentController {
    constructor(http, $rootRouter) {
        this.http = http;
        this.rootRouter = $rootRouter;
    }
    $onInit() {
        let self = this;
        if (window._injectedData.currentProject === undefined) {
            self.rootRouter.navigateByUrl('/noProject');
        }
    }
}

EventsComponentController.$inject = [
    'httpGeneral',
    '$rootRouter'
];

const eventsComponent = {
    controller: EventsComponentController,
    selector: 'eventsComponent',
    template: require('./events-pug.component.pug')(),
    $routeConfig: [{
        path: '/',
        name: 'Events List',
        component: 'eventList',
        useAsDefault: true
    }, {
        path: '/post',
        name: 'CreateEvent',
        component: 'eventCreateComponent',
    }, {
        path: '/:id/post',
        name: 'Edit event',
        component: 'eventEditComponent',
    }]
};

export {
    eventsComponent
};