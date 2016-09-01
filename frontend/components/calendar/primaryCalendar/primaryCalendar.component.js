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
        name:'MonthCalendar',
        component:'calendarMonth'
    },{
        path:'/dailyDetails',
        name:'DailyCalendar',
        component:'calendarDaily'
    }]
};

export{primaryCalendarComponent};