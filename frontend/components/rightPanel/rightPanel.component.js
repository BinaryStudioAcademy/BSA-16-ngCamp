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
        angular.element(document.querySelectorAll('.ng-isolate-scope')).bind("scroll", function(){
             if ((document.getElementsByTagName('right-panel-component')[0].scrollHeight - 
             document.getElementsByTagName('right-panel-component')[0].scrollTop - 
             document.getElementsByTagName('right-panel-component')[0].offsetHeight
             ) < 50 ) {
                 vm.previousDay();
             }
             vm.scp.$apply();
        });
    }

    $onInit() {
        let vm = this;
        
        let dateObj = {
            year: vm.date.getFullYear(),
            month: vm.date.getMonth(),
            date: vm.date.getUTCDate(),
            dow: vm.date.getUTCDay()
        };
        vm.getCheckins(dateObj);
    //    console.log(dateObj.dow + "dow");
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
            vm.rootScp.$broadcast('addDate', day);
        });
       
       
        // console.log(angular.element(document.querySelectorAll('#two')));
        
    }
    getCheckins(day){
        let vm = this;
        vm.httpGeneral.sendRequest({
            type: "GET",
            url: 'api/checkins/bydate/' + day.year + '/' + day.month + '/' +day.date
        }).then(function(res) {
            //console.log(res);
            res.forEach(function(check){
                vm.checkins.push(check);
                console.log(check);
            });
           
        });

    }
    previousDay(){
        let vm = this;
        let daynumber;
        // console.log(vm.dailyCheckinsList[0]['day'].dow);
        if((vm.dailyCheckinsList[0]['day'].dow - 1)>=0){
            daynumber = vm.dailyCheckinsList[0]['day'].dow - 1;
        } else {
            daynumber = 6;
        }
        let nextdate = vm.dailyCheckinsList[0]['day'];
        if(nextdate.date>1){
            // let dayOfWeekString = vm.days[daynumber];
            vm.checkins = [];
            // console.log(dayOfWeekString);
           

            let date = {
                year: nextdate.year,
                month: nextdate.month,
                date: nextdate.date - 1,
                dow: daynumber
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
            // let dayOfWeekString = vm.days[daynumber];
            vm.checkins = [];
           
            let date = {
                year: previousdate.year,
                month: previousdate.month,
                date: previousdate.date + 1,
                dow: daynumber
            };
            vm.getCheckins(date);
            vm.dailyCheckinsList.push({checkins: vm.checkins, day: date});
            vm.rootScp.$broadcast('addDate', date);
        }
        
    }   
    // checkinFilter(day){
    //     let vm = this;
    //     return function(element){
    //         let elementDate = new Date(element.creationDate);

    //         return (elementDate.getFullYear() == day.year &&
    //                 elementDate.getMonth() == day.month &&
    //                 elementDate.getDate() == day.day) ? true : false;
    //     };
    // }
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