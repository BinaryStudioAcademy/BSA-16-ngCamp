import './calendarMonth.styl';
let moment = require('moment');

class CalendarMonthCtrl {
    constructor($rootScope, $scope) {
        let vm = this;
        vm.rootScp = $rootScope;
        // vm.date = new Date();
        vm.scp = $scope;
        vm.currentMonth = new Date();
        vm.isChangeMonth = false;
        vm.checkedDays = [];
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
        vm.broadcastDate = (event, day) => {
           if(event.ctrlKey){
               if(day.isCurrentMonth){
                   let dateObj = {
                            year: day.date.year(),
                            month: day.date.month(),
                            date: day.date.date(),
                            // dow: day.date.isoWeekday()
                   };
                   if(!day.isChecked){
                        vm.rootScp.$broadcast('ctrlDate', dateObj);
                   } else {
                       day.isChecked = false;
                       vm.rootScp.$broadcast('removeDate', dateObj);
                   }
               }
           } else if(event.shiftKey){
               if(day.isCurrentMonth){
                    let dateObj = {
                        year: day.date.year(),
                        month: day.date.month(),
                        date: day.date.date(),
                        // dow: day.date.isoWeekday()
                    };
                    vm.rootScp.$broadcast('shiftdate', dateObj);
               }
            } else {
           
                for (let i=0; i<vm.weeks.length; i++){
                    vm.weeks[i].days.forEach(function(dayi){
                        dayi.isChecked = false;
                    });
                    //  vm.checkedDays[i].isChecked = 
                }
                day.isChecked = true;
                vm.checkedDays = [];
                vm.checkedDays.push(day);
                let dateObj = {
                    year: day.date.year(),
                    month: day.date.month(),
                    date: day.date.date(),
                    // dow: day.date.isoWeekday()
                };
                // console.log(dateObj);
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
        vm.scp.$on('addDate', function(event, addedDay){
            vm.weeks.forEach(function(week){
                week.days.forEach(function(day){
                    // console.log(day.date.date());
                    if(day.date.year() == addedDay.year && day.date.month() == addedDay.month  && day.date.date() == (addedDay.date)){
                        day.isChecked = true;
                        // console.log('before');
                        // console.log(day);
                    }
                });
            });
        //     console.log('added date'+ addedDay.dow + ' '+addedDay.day);
        //     // vm.date = day;
        //     // vm.checkins = [];
        //     // let dayOW = vm.days[vm.date.dow-1];
        //     // vm.getCheckins(dayOW);
        //     // vm.dailyCheckinsList = [];
        //     // vm.dailyCheckinsList.push({checkins: vm.checkins, day: vm.date});
        //     // console.log(vm.dailyCheckinsList);

        //    // vm.getCheckins(vm.days[vm.date.dow]);

        });

        vm.rootScp.$broadcast('endmonthdate', vm.monthEndMoment.date());
    }
}

CalendarMonthCtrl.$inject = ['$rootScope', '$scope'];

const calendarMonthComponent = {
    controller: CalendarMonthCtrl,
    controllerAs: 'cm',
    template: require('./calendarMonth.pug')(),
    selector: 'calendarMonth',
    bindings: {$router: '<'}
};

export  {calendarMonthComponent};