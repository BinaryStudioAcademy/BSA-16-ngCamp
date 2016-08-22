import './calendarDaily.styl';

class CalendarDailyCtrl {
    constructor(DailyCalendarHelper) {
        let vm = this;
        vm.alert = () => alert('test');

        vm.timeStamps = DailyCalendarHelper.getTimeStampsDaily();

        vm.currentDate = new Date();
        vm.isChangeDate = false;

        vm.startChangeDate = () => vm.isChangeDate = true;
        vm.endChangeDate = () => vm.isChangeDate = false;
        vm.changeDateOfStep = (step) => {
            let date = new Date(vm.currentDate);
            date.setDate(date.getDate() + step);
            vm.currentDate = date;
        };
    }
}

CalendarDailyCtrl.$inject = ['DailyCalendarHelper'];

const calendarDailytComponent = {
    controller: CalendarDailyCtrl,
    controllerAs: 'cd',
    template: require('./calendarDaily.pug')(),
    selector: 'calendarDaily'
};

export {calendarDailytComponent};