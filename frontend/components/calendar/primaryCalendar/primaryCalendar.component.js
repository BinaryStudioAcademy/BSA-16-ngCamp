import "./primaryCalendar.styl";

class primaryCalendarCtrl{
    constructor(){

    }
}

const primaryCalendarComponent = {
    controller: primaryCalendarCtrl,
    controllerAs: 'pc',
    template: require('./primaryCalendar.pug')(),
    selector: 'primaryCalendar'
};

export{primaryCalendarComponent};