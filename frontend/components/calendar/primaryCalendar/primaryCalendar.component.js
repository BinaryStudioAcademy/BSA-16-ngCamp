import "./primaryCalendar.styl";

class primaryCalendarCtrl{
    constructor(){

    }
}

const primaryCalendarComponent = {
    controller: primaryCalendarCtrl,
    controllerAs: 'pc',
    template: require('./primaryCalendar.pug')(),
    selector: 'primaryCalendar',
    $routeConfig: [{
        path:'/',
        name:'Month Calendar',
        component:'calendarMonth'
    }]
};

export{primaryCalendarComponent};