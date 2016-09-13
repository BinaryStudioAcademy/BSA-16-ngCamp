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
        vm.dailyCheckinsList.push({checkins: vm.checkins, day: dateObj});
        vm.scp.$on('date', function(event, day){
            vm.date = day;
            vm.checkins = [];
            vm.getCheckins(day);
            vm.dailyCheckinsList = [];
            vm.dailyCheckinsList.push({checkins: vm.checkins, day: vm.date});
        });
        vm.scp.$on('endmonthdate', function(event, day){
            vm.endOfMonth = day;
        });
        vm.scp.$on('shiftdate', function(event, day){
            if(day.date < vm.dailyCheckinsList[0].day.date){
                while(day.date < vm.dailyCheckinsList[0].day.date){
                    vm.previousDay();
                }
            } else if (day.date > vm.dailyCheckinsList[vm.dailyCheckinsList.length -1].day.date){
                while(day.date > vm.dailyCheckinsList[vm.dailyCheckinsList.length -1].day.date){
                    vm.nextDay();
                }
            }
        });
        vm.scp.$on('ctrldate', function(event, day){
            vm.checkins = [];
            vm.getCheckins(day);
            vm.dailyCheckinsList.push({checkins: vm.checkins, day: day});
            vm.dailyCheckinsList.sort(function(a, b){
                  if (a.day.date > b.day.date) {
                      return 1;
                  }
                  if (a.day.date < b.day.date) {
                      return -1;
                  }
                      return 0;
            });
            vm.rootScp.$broadcast('addDate', day);
        });
        angular.element(document.querySelectorAll('right-panel-component.ng-isolate-scope')).bind("scroll", function(){
            let scrollHeight = document.getElementsByTagName('right-panel-component')[0].scrollHeight;
            let scrollTop = document.getElementsByTagName('right-panel-component')[0].scrollTop;
            let offsetHeight = document.getElementsByTagName('right-panel-component')[0].offsetHeight;
            console.log(scrollHeight);
            if ((scrollHeight - scrollTop - offsetHeight) < 50 && scrollHeight > 0 ) {
                vm.previousDay();
            }
        });
        angular.element(document).bind("mousewheel", function(){
            let scrollHeight = document.getElementsByTagName('right-panel-component')[0].scrollHeight;
            let clientHeight = document.getElementsByTagName('right-panel-component')[0].clientHeight;
            if(scrollHeight == clientHeight){
                vm.previousDay();
            }
        });
    }
    getCheckins(day){
        let vm = this;
        vm.httpGeneral.sendRequest({
            type: "GET",
            url: 'api/checkins/bydate/' + day.year + '/' + day.month + '/' +day.date
        }).then(function(res) {
            res.forEach(function(check){
                vm.checkins.push(check);
            });
        });
    }
    previousDay(){
        let vm = this;
        let daynumber;
        if((vm.dailyCheckinsList[0]['day'].dow - 1)>=0){
            daynumber = vm.dailyCheckinsList[0]['day'].dow - 1;
        } else {
            daynumber = 6;
        }
        let nextdate = vm.dailyCheckinsList[0]['day'];
        if(nextdate.date>1){
            vm.checkins = [];
            let date = {
                year: nextdate.year,
                month: nextdate.month,
                date: nextdate.date - 1
            };
            vm.getCheckins(date);
            vm.dailyCheckinsList.unshift({checkins: vm.checkins, day: date});
            vm.rootScp.$broadcast('addDate', date);
        }
    }
    nextDay(){
        let vm = this;
        let daynumber;
        if((vm.dailyCheckinsList[vm.dailyCheckinsList.length -1]['day'].dow + 1)<=6){
            daynumber = vm.dailyCheckinsList[vm.dailyCheckinsList.length -1]['day'].dow + 1;
        } else {
            daynumber = 0;
        }
        let previousdate = vm.dailyCheckinsList[vm.dailyCheckinsList.length -1]['day'];
 
        if(previousdate.date < vm.endOfMonth){
            vm.checkins = [];
            let date = {
                year: previousdate.year,
                month: previousdate.month,
                date: previousdate.date + 1
            };
            vm.getCheckins(date);
            vm.dailyCheckinsList.push({checkins: vm.checkins, day: date});
            vm.rootScp.$broadcast('addDate', date);
        }
    }   
}

RightPanelComponentController.$inject = ['httpGeneral', '$scope', '$rootScope'];

const rightPanelComponent = {
    controller: RightPanelComponentController,
    selector: 'rightPanelComponent',
    controllerAs: 'rpanel',
    template: require('./panel-pug.component.pug')(),
    $routeConfig: [{
        path:'/',
        name:'Checkins List',
        component:'checkinsListComponent',
        useAsDefault: true
    }]
};

export {
    rightPanelComponent
};