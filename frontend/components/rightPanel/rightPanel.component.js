//import './checkinsStyles.styl';

class RightPanelComponentController {
    constructor(httpGeneral, $scope, $rootScope) {
        let vm = this;
        vm.httpGeneral = httpGeneral;
        vm.date = new Date();
        vm.leftMostDate = new Date();
        vm.rigthMostDate = new Date();
        vm.scp = $scope;
        vm.rootScp = $rootScope;
        vm.years = [];
        
        vm.checkins = [];
        vm.dailyCheckinsList = [];
        vm.endOfMonth = 35;
        vm.changeProjectHover = false;
    }
    // minOfTwoDateObjects(dateO1, dateO2) {
    //     let d1 = new Date(dateO1.year, dateO1.month, dateO1.date); 
    //     let d2 = new Date(dateO2.year, dateO2.month, dateO2.date); 
    //     if (d1 > d2) {
    //         return dateO2;
    //     } else if(d1 < d2 ) {
    //         return dateO1;
    //     } else {
    //         return dateO1;
    //     }
    // }
    // maxOfTwoDateObjects(dateO1, dateO2) {
    //     let d1 = new Date(dateO1.year, dateO1.month, dateO1.date); 
    //     let d2 = new Date(dateO2.year, dateO2.month, dateO2.date); 
    //     if (d1 > d2) {
    //         return dateO1;
    //     } else if(d1 < d2 ) {
    //         return dateO2;
    //     } else {
    //         return dateO1;
    //     }
    // }

    addDateToDisplay(day) {
        let vm = this;
        vm.checkins = [];
        vm.getCheckins(day);
        // vm.leftMostDate = vm.minOfTwoDateObjects(vm.findLeftMostDate, day);
        // vm.findRightMostDate = vm.maxOfTwoDateObjects(vm.findRightMostDate, day);
        if (!vm.years[day.year]){
            let months = [];
            let days = [];
            days[day.date] = vm.checkins;
            months[day.month] = {days: days};
            vm.years[day.year] = {year: day.year, months: months};
        } else {
            // console.log(vm.years[day.year].months);
            if (!vm.years[day.year].months[day.month]){
                let days = [];
                days[day.date] = vm.checkins;
                vm.years[day.year].months[day.month] = { days: days};                   
            } else  if(vm.years[day.year].months[day.month]){
                vm.years[day.year].months[day.month].days[day.date] = vm.checkins;
            } else {
                // vm.years[day.year].months[day.month].days = [];
                // vm.years[day.year].months[day.month].days[day.date] = vm.checkins;
            }
            
        }
        
    }

    $onInit() {
        let vm = this;
        let dateObj = {
            year: vm.date.getFullYear(),
            month: vm.date.getMonth(),
            date: vm.date.getUTCDate()
        };
        vm.getCheckins(dateObj);
        let months = [];
        let days = [];
        days[dateObj.date] = vm.checkins;
        months[dateObj.month] = {days: days};
        vm.years[dateObj.year] = {year: dateObj.year, months: months};

        vm.scp.$on('date', function(event, day) {
            vm.years = [];
            vm.checkins = [];
            vm.getCheckins(day);
            let months = [];
            let days = [];
            days[day.date] = vm.checkins;
            months[day.month] = {days: days};
            vm.years[day.year] = {year: day.year, months: months};
            // vm.dailyCheckinsList[0] = 1;
        });

        vm.scp.$on('endmonthdate', function(event, day) {
            vm.endOfMonth = day;
        });

        vm.scp.$on('mouseOut', function(event) {
            vm.changeProjectHover = false;
        });

        vm.scp.$on('mouseIn', function(event) {
            vm.changeProjectHover = true;
        });

        vm.scp.$on('shiftdate', function(event, day) {
            let leftMost = vm.findLeftMostDate();
            let leftMostDate = new Date(leftMost.year, leftMost.month, leftMost.day);
            let dayDate = new Date(day.year, day.month, day.date);
            if (dayDate < leftMostDate) {
                for (let i = 1; i < (leftMost.date - day.date) + 1; i++) {
                    let date = {
                        year: leftMost.year,
                        month: leftMost.month,
                        date: leftMost.date - i
                    };
                    vm.checkins = [];
                    let checkinsArray = [];
                    vm.httpGeneral.sendRequest({
                        type: "GET",
                        url: 'api/checkins/' + window._injectedData.currentProject + '/bydate/' + date.year + '/' + date.month + '/' + date.date
                    }).then(function(res) {
                        vm.addDateToDisplay(day);
                        if (res) {
                            res.forEach(function(check) {
                                vm.dailyCheckinsList[date.date].checkins.push(check);
                            });
                        }
                        if (vm.dailyCheckinsList[0]) {
                            vm.dailyCheckinsList[0] += 1;
                        } else {
                            vm.dailyCheckinsList[0] = 1;
                        }
                        vm.rootScp.$broadcast('addDate', date);
                    });
                }

            } else if (day.date <= vm.endOfMonth) {
                for (let i = 1; i < (day.date - leftMost.date) + 1; i++) {
                    let date = {
                        year: leftMost.year,
                        month: leftMost.month,
                        date: leftMost.date + i
                    };
                    vm.checkins = [];
                    let checkinsArray = [];
                    vm.httpGeneral.sendRequest({
                        type: "GET",
                        url: 'api/checkins/' + window._injectedData.currentProject + '/bydate/' + date.year + '/' + date.month + '/' + date.date
                    }).then(function(res) {
                        vm.dailyCheckinsList[date.date] = {
                            checkins: [],
                            day: date
                        };
                        if (res) {
                            res.forEach(function(check) {
                                vm.dailyCheckinsList[date.date].checkins.push(check);
                            });
                        }
                        if (vm.dailyCheckinsList[0]) {
                            vm.dailyCheckinsList[0] += 1;
                        } else {
                            vm.dailyCheckinsList[0] = 1;
                        }
                        vm.rootScp.$broadcast('addDate', date);
                    });
                }
            }
        });

        vm.scp.$on('ctrlDate', function(event, day) {
               vm.checkins = [];
               vm.getCheckins(day);
            //    console.log(vm.years[day.year].months);
               if (!vm.years[day.year]){

               } else {
                   vm.years[day.year].months[day.month].days[day.date] = vm.checkins;
               }
            //    let months = [];
            //    let days = [];
            //    days[day.date] = vm.checkins;
            //    months[day.month] = {days: days};
            //    vm.years[day.year] = {year: day.year, months: months};
            // if (day.date >= 1 && day.date <= vm.endOfMonth) {
            //     vm.checkins = [];
            //     vm.getCheckins(day);
            //     vm.dailyCheckinsList[day.date] = {
            //         checkins: vm.checkins,
            //         day: day
            //     };
                // if (vm.dailyCheckinsList[0]) {
                //     vm.dailyCheckinsList[0] += 1;
                // } else {
                //     vm.dailyCheckinsList[0] = 1;
                // }
                let right = vm.findRightMostDate();
                vm.rootScp.$broadcast('addDate', day, right);
            // }
        });

        vm.scp.$on('removeDate', function(event, day) {
            vm.years[day.year].months[day.month].days[day.date] = undefined;
            // vm.dailyCheckinsList[day.date] = undefined;
            // vm.dailyCheckinsList[0] -= 1;
            // if (vm.dailyCheckinsList[0] == 0) {
            //     vm.date = new Date();
            //     let dateObj = {
            //         year: vm.date.getFullYear(),
            //         month: vm.date.getMonth(),
            //         date: vm.date.getDate()
            //     };
            //     vm.checkins = [];
            //     vm.getCheckins(dateObj);
            //     vm.dailyCheckinsList[dateObj.date] = {
            //         checkins: vm.checkins,
            //         day: dateObj
            //     };
            //     vm.dailyCheckinsList[0] = 1;
            // }
        });

        angular.element(document.querySelectorAll('right-panel-component.ng-isolate-scope')).bind("scroll", function() {
            vm.scrollHandler();
        });

        angular.element(document).bind("mousewheel", function(e) {
            vm.mouseWheelHandler(e);
        });

        // if (!vm.checkins.length) {
        //     setTimeout(function() {
        //         let async = require('async');
        //         async.doUntil(function(callback) {
        //             // debugger;
        //             vm.previousDay().then(function(data) {
        //                 callback(null, data);
        //             });
        //         }, function() {
        //             return vm.checkins.length;
        //         });
        //     }, 200);
        // }
    }

    scrollHandler() {
        let vm = this;
        let scrollHeight = document.getElementsByTagName('right-panel-component')[0].scrollHeight;
        let scrollTop = document.getElementsByTagName('right-panel-component')[0].scrollTop;
        let offsetHeight = document.getElementsByTagName('right-panel-component')[0].offsetHeight;
        if (((scrollHeight - scrollTop - offsetHeight) / scrollHeight * 100) < 15 && scrollHeight > 80) {
            let left = vm.findLeftMostDate();
            let right = vm.findRightMostDate();
            // if ((right.date - left.date + 1 === vm.dailyCheckinsList[0]) || (right.date - left.date === vm.dailyCheckinsList[0]) || vm.dailyCheckinsList.length == 1) {
            // if ((right.date - left.date >= vm.dailyCheckinsList[0]) || vm.dailyCheckinsList.length == 1) {
                vm.previousDay();
            // }
        }
    }

    mouseWheelHandler(e) {
        let vm = this;
        let scrollHeight = document.getElementsByTagName('right-panel-component')[0].scrollHeight;
        let clientHeight = document.getElementsByTagName('right-panel-component')[0].clientHeight;
        if (e.wheelDelta < 0) {
            if (scrollHeight == clientHeight) {
                let left = vm.findLeftMostDate();
                // console.log(left);
                let right = vm.findRightMostDate();
                // if (((right.date - left.date + 1 === vm.dailyCheckinsList[0]) || (right.date - left.date === vm.dailyCheckinsList[0]) || vm.dailyCheckinsList.length == 1) && vm.changeProjectHover == false) {
                // if (((right.date - left.date >= vm.dailyCheckinsList[0]) || vm.dailyCheckinsList.length == 1) && vm.changeProjectHover == false) {
                    // console.log('previous day');
                    vm.previousDay();
                // }
            }
        }
    }

    getCheckins(day) {
        let vm = this;
        return vm.httpGeneral.sendRequest({
            type: "GET",
            url: 'api/checkins/' + window._injectedData.currentProject + '/bydate/' + day.year + '/' + day.month + '/' + day.date
        }).then(function(res) {
            if (res) {
                res.forEach(function(check) {
                    vm.checkins.push(check);
                });
                return res;
            }
        });
    }

    previousDay() {
        let vm = this;
        let leftMost = vm.findLeftMostDate();
        if (leftMost.date > 1) {
            vm.checkins = [];
            let date = {
                year: leftMost.year,
                month: leftMost.month,
                date: leftMost.date - 1
            };
            vm.addDateToDisplay(date);
            // vm.dailyCheckinsList[date.date] = {
            //     checkins: vm.checkins,
            //     day: date
            // };
            // if (vm.dailyCheckinsList[0]) {
            //     vm.dailyCheckinsList[0] += 1;
            // } else {
            //     vm.dailyCheckinsList[0] = 1;
            // }
            let right = vm.findRightMostDate();
            vm.rootScp.$broadcast('addDate', date, right);
            return vm.getCheckins(date).then(function(data) {
                return data;
            });
        } else {
            // console.log('else');
            vm.checkins = [];
            // not forget to add the year transition
            let date = {
                year: leftMost.year,
                month: --leftMost.month,
                date: new Date(leftMost.year, leftMost.month + 1, 0).getDate()
            };
            // console.log(date);
            vm.addDateToDisplay(date);
            // vm.dailyCheckinsList[date.date] = {
            //     checkins: vm.checkins,
            //     day: date
            // };
            // if (vm.dailyCheckinsList[0]) {
            //     vm.dailyCheckinsList[0] += 1;
            // } else {
            //     vm.dailyCheckinsList[0] = 1;
            // }
            let right = vm.findRightMostDate();
            vm.rootScp.$broadcast('addDate', date, right);
            return vm.getCheckins(date).then(function(data) {
                return data;
            });
        }
    }

    findLeftMostDate() {
        let vm = this;
        let leftMost = null;
        loop1:
        for (let i = 0; i < vm.years.length; i++) {
            if(vm.years[i]){
                // console.log('before');
                loop2:
                for(let j=0; j < vm.years[i].months.length; j++) {
                    // console.log(j);
                    if (vm.years[i].months[j]) {
                        if (vm.years[i].months[j].days) {
                            loop3:
                            for (let k=0; k < vm.years[i].months[j].days.length; k++) {
                                 if (vm.years[i].months[j].days[k]) {
                                    // leftMost = vm.years[i].months[j].days[k];
                                    leftMost = { year: i, month: j, date: k};
                                    // console.log('leftmostdate');
                                    // console.log(leftMost);
                                    // console.log(vm.years[i]);
                                    // console.log(i);
                                    // console.log(j);
                                    // console.log(k);
                                    break loop2;
                                }
                            }
                        }
                    }
                }
            }
        }
        return leftMost;
    }
    // there be a problem when there will be two years
    findRightMostDate() {
        let vm = this;
        let rightMost = null;
        loop1:
        for (let i = vm.years.length; i >=0; i--) {
            if(vm.years[i]){
                loop2:
                for(let j = vm.years[i].months.length; j >= 0; j--){
                    if (vm.years[i].months[j]) {
                        if (vm.years[i].months[j].days){
                            loop3:
                            for (let k = vm.years[i].months[j].days.length; k >= 0; k--){
                                if (vm.years[i].months[j].days[k]) {
                                    rightMost = { year: i, month: j, date: k};
                                    break loop2;
                                }
                            }
                        }
                    }
                }
            }
        }
        return rightMost;
    }

    dayFilter(day) {
        let activeCheckins = [];
        if (!day || !day.checkins || !day.checkins.length) return false;
        let doShow = false;
        if (day.checkins.length) {
            let iterationsCount = day.checkins.length;
            for (let i = 0; i < iterationsCount; i++) {
                if (day.checkins[i].answers && day.checkins[i].answers.length) {
                    let answersCount = day.checkins[i].answers.length;
                    for (let j = 0; j < answersCount; j++) {
                        if (day.checkins[i].answers[j] && day.checkins[i].answers[j] !== 'noAnswer') {
                            // activeCheckins.push(day.checkins[i]);
                            // doShow = true;
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }

    $onDestroy() {
        let vm = this;
        angular.element(document.querySelectorAll('right-panel-component.ng-isolate-scope')).unbind("scroll");
        angular.element(document).unbind("mousewheel");
    }
    checkinEmptyFilter(checkin) {
        let doShow = false;
        for (let i = 0; i < checkin.answers.length; i++) {
            if (checkin.answers[i] && checkin.answers[i] !== 'noAnswer') doShow = true;
            else if (checkin.answers[i]) checkin.answers.slice(i, 1);
        }

        if (doShow) return checkin;
    }
}

RightPanelComponentController.$inject = ['httpGeneral', '$scope', '$rootScope'];

const rightPanelComponent = {
    controller: RightPanelComponentController,
    selector: 'rightPanelComponent',
    controllerAs: 'rpanel',
    template: require('./panel-pug.component.pug')(),
    $routeConfig: [{
        path: '/',
        name: 'Checkins List',
        component: 'checkinsListComponent',
        useAsDefault: true
    }]
};

export {
    rightPanelComponent
};