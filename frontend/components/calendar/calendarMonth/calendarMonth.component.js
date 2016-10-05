import './calendarMonth.styl';
let moment = require('moment');

class CalendarMonthCtrl {
    constructor($rootScope, $scope, mainPageCheckinData) {
        let vm = this;
        vm.rootScp = $rootScope;
        vm.scp = $scope;
        vm.checkinData = mainPageCheckinData;
        vm.currentMonth = new Date();
        vm.isChangeMonth = false;
        vm.checkedDays = [];
        vm.years = {
            get list() {
                return vm.checkinData.years;
            } 
        };

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
                        isToday: date.isSame(new Date(), 'day'),
                        isChecked: false,
                        date: date.clone()
                    });
                    date.add(1, "d");
                }
                if (weekIndex > 3 && !days[0].isCurrentMonth) {
                    break;
                } else {
                   vm.weeks.push({
                        days: days
                    });
                }
            }
        };

        vm.next = () => {
            vm.monthStartMoment.add(1, 'M');
            vm.monthStartMoment.startOf('month');
            vm.monthEndMoment = vm.monthStartMoment.clone().endOf('month');
            vm.createMonthView();
            vm.buildMonth();
            vm.findAndCheckDays();
        };

        vm.prev = () => {
            vm.monthStartMoment.add(-1, 'M');
            vm.monthStartMoment.startOf('month');
            vm.monthEndMoment = vm.monthStartMoment.clone().endOf('month');
            vm.createMonthView();
            vm.buildMonth();
            vm.findAndCheckDays();
        };

        vm.findAndCheckDays = () => {
            if (vm.years.list.length > 0) {
                for (let i=0; i < vm.weeks.length; i++) {
                    for (let j=0; j < vm.weeks[i].days.length; j++) {
                        let day = vm.weeks[i].days[j];
                        let year = day.date.year();
                        let month = day.date.month();
                        let date = day.date.date();
                        vm.years.list.forEach(function(y) {
                            if(y.year == year) {
                                if(y.months) {
                                    if (y.months[month]) {
                                        if (y.months[month].days) {
                                            if (y.months[month].days[date]) {
                                                day.isChecked = true;
                                            }
                                        }
                                    } 
                                }
                            }
                        });
                    }
                }
            }
        };

        vm.broadcastDate = (event, day) => {
            if (event.ctrlKey) {
                if (day.isCurrentMonth) {
                    let dateObj = {
                        year: day.date.year(),
                        month: day.date.month(),
                        date: day.date.date(),
                    };
                    if (!day.isChecked) {
                        vm.rootScp.$broadcast('ctrlDate', dateObj);
                    } else {
                        day.isChecked = false;
                        vm.rootScp.$broadcast('removeDate', dateObj);
                    }
                }
            } else if (event.shiftKey) {
                if (day.isCurrentMonth) {
                    let dateObj = {
                        year: day.date.year(),
                        month: day.date.month(),
                        date: day.date.date(),
                    };
                    vm.rootScp.$broadcast('shiftdate', dateObj);
                }
            } else {

                for (let i = 0; i < vm.weeks.length; i++) {
                    vm.weeks[i].days.forEach(function(dayi) {
                        dayi.isChecked = false;
                    });
                }
                day.isChecked = true;
                vm.checkedDays = [];
                vm.checkedDays.push(day);
                let dateObj = {
                    year: day.date.year(),
                    month: day.date.month(),
                    date: day.date.date(),
                };
                vm.rootScp.$broadcast('date', dateObj);
            }
        };
        
        vm.goto = (date) => {
            let dateObj = {
                year: date.year(),
                month: date.month(),
                day: date.date(),
                dow: date.dayOfWeek()
            };
            vm.$router.navigate(['DailyCalendar', dateObj]);
        };

        vm.createMonthView = () => {
            vm.mViewStartMoment = vm.monthStartMoment.clone();
            vm.mViewStartMoment.add(-vm.monthStartMoment.isoWeekday() + 1, 'd');
            vm.mViewEndMoment = vm.mViewStartMoment.clone();
            vm.mViewEndMoment.add(6, 'w');
            vm.mViewEndMoment.set({
                'hour': 23,
                'minute': 59
            });
        };

        vm.init = () => {
            vm.monthStartMoment = moment();
            vm.monthStartMoment.set({
                hour: 0,
                minute: 0
            });
            vm.monthStartMoment.startOf('month');
            vm.monthEndMoment = vm.monthStartMoment.clone().endOf('month');
            vm.mViewStartMoment = vm.monthStartMoment.clone();
            vm.mViewStartMoment.add(-vm.monthStartMoment.isoWeekday() + 1, 'd');
            vm.mViewEndMoment = vm.mViewStartMoment.clone();
            vm.mViewEndMoment.add(6, 'w');
            vm.mViewEndMoment.set({
                'hour': 23,
                'minute': 59
            });
            vm.buildMonth();
        };
        vm.init();
    }

    $routerOnActivate(next) {
        let vm = this;
        let {
            day,
            month,
            year
        } = next.params;
        let date = day !== undefined ? new Date(year, month, day) : new Date();
        vm.monthStartMoment = moment(date || new Date());
        vm.monthStartMoment.startOf('month');
        vm.monthEndMoment = vm.monthStartMoment.clone().endOf('month');
        vm.createMonthView();
        vm.buildMonth();
        vm.scp.$on('addDate', function(event, addedDay) {
            let prevMonthLastDisplaydDateObj = vm.weeks[0].days[0].date;
            let prevMonthLastDisplaydDate = new Date(prevMonthLastDisplaydDateObj.year(), 
                prevMonthLastDisplaydDateObj.month(), 
                prevMonthLastDisplaydDateObj.date());
            let addedDayDate = new Date(addedDay.year, addedDay.month, addedDay.date);
            if (prevMonthLastDisplaydDate > addedDayDate) {
                vm.prev();
            } 
            vm.weeks.forEach(function(week) {
                week.days.forEach(function(day) {
                    if (day.date.year() == addedDay.year && day.date.month() == addedDay.month && day.date.date() == (addedDay.date)) {
                        day.isChecked = true;
                    }
                });
            });
        });
        vm.rootScp.$broadcast('endmonthdate', vm.monthEndMoment.date());
        vm.findAndCheckDays();
    }
}

CalendarMonthCtrl.$inject = ['$rootScope', '$scope', 'mainPageCheckinData'];

const calendarMonthComponent = {
    controller: CalendarMonthCtrl,
    controllerAs: 'cm',
    template: require('./calendarMonth.pug')(),
    selector: 'calendarMonth',
    bindings: {
        $router: '<'
    }
};

export {
    calendarMonthComponent
};