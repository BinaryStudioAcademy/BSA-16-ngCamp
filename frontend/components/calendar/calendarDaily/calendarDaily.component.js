import './calendarDaily.styl';

class CalendarDailyCtrl {
    constructor(DailyCalendarHelper) {
        let vm = this;
        vm.alert = () => alert('test');

        vm.timeStamps = DailyCalendarHelper.getTimeStampsDaily();

        vm.currentDate = new Date();
        vm.isChangeDate = false;

        vm.goto = () => {
            let date = vm.currentDate;
            let dateObj = {
                year: date.getFullYear(),
                month: date.getMonth(),
                day: date.getDate()
            };

            vm.$router.navigate(['MonthCalendar', dateObj]);
        };

        vm.startChangeDate = () => vm.isChangeDate = true;
        vm.endChangeDate = () => vm.isChangeDate = false;
        vm.changeDateOfStep = (step) => {
            let date = new Date(vm.currentDate);
            date.setDate(date.getDate() + step);
            vm.currentDate = date;
        };
    }

    $routerOnActivate(next) {
        let vm = this;

        let {day,month, year} = next.params;

        vm.currentDate = new Date(year, month, day);
    }
}

CalendarDailyCtrl.$inject = ['DailyCalendarHelper'];

const calendarDailytComponent = {
    controller: CalendarDailyCtrl,
    controllerAs: 'cd',
    template: require('./calendarDaily.pug')(),
    selector: 'calendarDaily',
    bindings: { $router: '<' }
};

export {calendarDailytComponent};