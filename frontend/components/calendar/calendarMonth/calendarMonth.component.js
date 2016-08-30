import './calendarMonth.styl';
let moment = require('moment');

class CalendarMonthCtrl {
    constructor() {
        let vm = this;

        vm.currentMonth = new Date();
        vm.isChangeMonth = false;

        vm.startChangeMonth = () => vm.isChangeMonth = true;
        vm.endChangeMonth = () => {
            vm.isChangeMonth = false;

            vm.monthStartMoment = moment(vm.currentMonth);
            vm.monthStartMoment.startOf('month');
            vm.monthEndMoment = vm.monthStartMoment.clone().endOf('month');

            vm.createMonthView();

            vm.buildMonth();
        };

        vm.buildMonth = () => {
            let date = vm.mViewStartMoment.clone();
            vm.weeks = [];

            for (let weekIndex = 0; weekIndex < 6; weekIndex++) {
                let days = [];

                for (let j = 0; j < 7; j++) {
                    days.push({
                        number: date.date(),
                        isCurrentMonth: date.month() === vm.monthStartMoment.month(),
                        isToday: date.isSame(new Date(), "day"),
                        date: date.clone()
                    });
                    date.add(1, "d");
                }
                vm.weeks.push({days: days});
            }
        };

        vm.next = () => {
            vm.monthStartMoment.add(1, 'M');
            vm.monthStartMoment.startOf('month');
            vm.monthEndMoment = vm.monthStartMoment.clone().endOf('month');

            vm.createMonthView();

            vm.buildMonth();
        };

        vm.prev = () => {
            vm.monthStartMoment.add(-1, 'M');
            vm.monthStartMoment.startOf('month');
            vm.monthEndMoment = vm.monthStartMoment.clone().endOf('month');

            vm.createMonthView();

            vm.buildMonth();
        };

        vm.goto = (date) => {
            let dateObj = {
                year: date.year(),
                month: date.month(),
                day: date.date()
            };

            vm.$router.navigate(['DailyCalendar', dateObj]);
        };

        vm.createMonthView = () => {
            vm.mViewStartMoment = vm.monthStartMoment.clone();
            vm.mViewStartMoment.add(-vm.monthStartMoment.isoWeekday() + 1, 'd');
            vm.mViewEndMoment = vm.mViewStartMoment.clone();
            vm.mViewEndMoment.add(6, 'w');
            vm.mViewEndMoment.set({'hour': 23, 'minute': 59});
        };

        vm.init = () => {
            vm.monthStartMoment = moment();
            vm.monthStartMoment.set({hour: 0, minute: 0});
            vm.monthStartMoment.startOf('month');

            vm.monthEndMoment = vm.monthStartMoment.clone().endOf('month');

            vm.mViewStartMoment = vm.monthStartMoment.clone();
            vm.mViewStartMoment.add(-vm.monthStartMoment.isoWeekday() + 1, 'd');

            vm.mViewEndMoment = vm.mViewStartMoment.clone();
            vm.mViewEndMoment.add(6, 'w');
            vm.mViewEndMoment.set({'hour': 23, 'minute': 59});

            vm.buildMonth();
        };

        vm.init();
    }

    $routerOnActivate(next) {
        let vm = this;

        let {day,month, year} = next.params;
        let date = day !== undefined ? new Date(year, month, day) : new Date();

        vm.monthStartMoment = moment(date || new Date());
        vm.monthStartMoment.startOf('month');
        vm.monthEndMoment = vm.monthStartMoment.clone().endOf('month');

        vm.createMonthView();

        vm.buildMonth();
    }
}

CalendarMonthCtrl.$inject = [];

const calendarMonthComponent = {
    controller: CalendarMonthCtrl,
    controllerAs: 'cm',
    template: require('./calendarMonth.pug')(),
    selector: 'calendarMonth',
    bindings: {$router: '<'}
};

export  {calendarMonthComponent};