//import './checkinsStyles.styl';

class RightPanelComponentController {
    constructor(httpGeneral, $scope, $rootScope) {
        let vm = this;
        vm.httpGeneral = httpGeneral;
        vm.date = new Date();
        vm.scp = $scope;
        vm.rootScp = $rootScope;
        vm.checkins = [];
        vm.dailyCheckinsList = [];
        vm.endOfMonth = 35;
        vm.changeProjectHover = false;
        this.days = ['Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday'];
    }

    $onInit() {
        let vm = this;
        let dateObj = {
            year: vm.date.getFullYear(),
            month: vm.date.getMonth(),
            date: vm.date.getUTCDate()
        };
        vm.getCheckins(dateObj);
        vm.dailyCheckinsList[dateObj.date] = { checkins: vm.checkins, day: dateObj };
        vm.scp.$on('date', function (event, day) {
            vm.date = day;
            vm.checkins = [];
            vm.getCheckins(day);
            vm.dailyCheckinsList = [];
            vm.dailyCheckinsList[vm.date.date] = { checkins: vm.checkins, day: vm.date };
            vm.dailyCheckinsList[0] = 1;
        });

        vm.scp.$on('endmonthdate', function (event, day) {
            vm.endOfMonth = day;
        });

        vm.scp.$on('mouseOut', function (event) {
            vm.changeProjectHover = false;
        });

        vm.scp.$on('mouseIn', function (event) {
            vm.changeProjectHover = true;
        });

        vm.scp.$on('shiftdate', function (event, day) {
            let leftMost = vm.findLeftMostDate();
            if (day.date < leftMost.date) {
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
                        url: 'api/checkins/bydate/' + date.year + '/' + date.month + '/' + date.date
                    }).then(function (res) {
                        vm.dailyCheckinsList[date.date] = { checkins: [], day: date };
                        res.forEach(function (check) {
                            vm.dailyCheckinsList[date.date].checkins.push(check);
                        });
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
                        url: 'api/checkins/bydate/' + date.year + '/' + date.month + '/' + date.date
                    }).then(function (res) {
                        vm.dailyCheckinsList[date.date] = { checkins: [], day: date };
                        res.forEach(function (check) {
                            vm.dailyCheckinsList[date.date].checkins.push(check);
                        });
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

        vm.scp.$on('ctrlDate', function (event, day) {
            if (day.date >= 1 && day.date <= vm.endOfMonth) {
                vm.checkins = [];
                vm.getCheckins(day);
                vm.dailyCheckinsList[day.date] = { checkins: vm.checkins, day: day };
                if (vm.dailyCheckinsList[0]) {
                    vm.dailyCheckinsList[0] += 1;
                } else {
                    vm.dailyCheckinsList[0] = 1;
                }
                vm.rootScp.$broadcast('addDate', day);
            }
        });

        vm.scp.$on('removeDate', function (event, day) {
            vm.dailyCheckinsList[day.date] = undefined;
            vm.dailyCheckinsList[0] -= 1;
            if (vm.dailyCheckinsList[0] == 0) {
                vm.date = new Date();
                let dateObj = {
                    year: vm.date.getFullYear(),
                    month: vm.date.getMonth(),
                    date: vm.date.getDate()
                };
                vm.checkins = [];
                vm.getCheckins(dateObj);
                vm.dailyCheckinsList[dateObj.date] = { checkins: vm.checkins, day: dateObj };
                vm.dailyCheckinsList[0] = 1;
            }
        });

        angular.element(document.querySelectorAll('right-panel-component.ng-isolate-scope')).bind("scroll", function(){
            vm.scrollHandler(); 
        });
 
        angular.element(document).bind("mousewheel", function(e){
             vm.mouseWheelHandler(e);
        });
    }

    scrollHandler() {
        let vm = this;
        let scrollHeight = document.getElementsByTagName('right-panel-component')[0].scrollHeight;
        let scrollTop = document.getElementsByTagName('right-panel-component')[0].scrollTop;
        let offsetHeight = document.getElementsByTagName('right-panel-component')[0].offsetHeight;
        if ((scrollHeight - scrollTop - offsetHeight) < 50 && scrollHeight > 80) {
            let left = vm.findLeftMostDate();
            let right = vm.findRightMostDate();
            if ((right.date - left.date + 1 == vm.dailyCheckinsList[0]) || vm.dailyCheckinsList.length == 1) {
                vm.previousDay();
            }
        }
    }
    mouseWheelHandler(e){
        let vm = this;
        let scrollHeight = document.getElementsByTagName('right-panel-component')[0].scrollHeight;
        let clientHeight = document.getElementsByTagName('right-panel-component')[0].clientHeight;
        if (e.wheelDelta < 0) {
            if (scrollHeight == clientHeight) {
                let left = vm.findLeftMostDate();
                let right = vm.findRightMostDate();
                if (((right.date - left.date + 1 == vm.dailyCheckinsList[0]) || vm.dailyCheckinsList.length == 1) && vm.changeProjectHover == false) {
                    vm.previousDay();
                }
            }
        }
    }

    getCheckins(day) {
        let vm = this;
        vm.httpGeneral.sendRequest({
            type: "GET",
            url: 'api/checkins/'+window._injectedData.currentProject+'/bydate/' + day.year + '/' + day.month + '/' + day.date
        }).then(function (res) {
            res.forEach(function (check) {
                vm.checkins.push(check);
            });
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
            vm.getCheckins(date);
            vm.dailyCheckinsList[date.date] = { checkins: vm.checkins, day: date };
            if (vm.dailyCheckinsList[0]) {
                vm.dailyCheckinsList[0] += 1;
            } else {
                vm.dailyCheckinsList[0] = 1;
            }
            vm.rootScp.$broadcast('addDate', date);
        }
    }

    findLeftMostDate() {
        let vm = this;
        let leftMost = null;
        for (let i = 1; i < vm.dailyCheckinsList.length; i++) {
            if (vm.dailyCheckinsList[i]) {
                leftMost = vm.dailyCheckinsList[i].day;
                break;
            }
        }
        return leftMost;
    }

    findRightMostDate() {
        let vm = this;
        let leftMost = null;
        for (let i = vm.dailyCheckinsList.length; i >= 0; i--) {
            if (vm.dailyCheckinsList[i]) {
                leftMost = vm.dailyCheckinsList[i].day;
                break;
            }
        }
        return leftMost;
    }

    dayFilter() {
        return function (element) {
            return (element ? true : false);
        };
    }
    $onDestroy(){
        let vm = this;
        angular.element(document.querySelectorAll('right-panel-component.ng-isolate-scope')).unbind("scroll");
        angular.element(document).unbind("mousewheel");
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