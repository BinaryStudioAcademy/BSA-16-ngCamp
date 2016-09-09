//import './checkinsStyles.styl';

class RightPanelComponentController {
    constructor(httpGeneral, $scope) {
        let vm = this;
        vm.httpGeneral = httpGeneral;
        vm.date = new Date();
        vm.scp = $scope;
        vm.checkins = [];
        vm.dailyCheckinsList = [];

        this.days = ['Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'];
     }
    $onInit() {
        let vm = this;
        vm.getCheckins(vm.days[vm.date.getDay()]);
        vm.scp.$on('date', function(event, date){
            vm.date = date;
            vm.checkins = [];
            let dayOW = vm.days[vm.date.dow];
            vm.getCheckins(dayOW);
            vm.dailyCheckinsList = [];
            vm.dailyCheckinsList.push({checkins: vm.checkins, day: vm.date});
            // console.log(vm.dailyCheckinsList);
        });
    }
    getCheckins(day){
        let vm = this;
        vm.httpGeneral.sendRequest({
            type: "GET",
            url: 'api/checkins/freq/' + day
        }).then(function(res) {
            //console.log(res);
            res.forEach(function(check){
                vm.checkins.push(check);
                //console.log(check);
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
        let dayOfWeekString = vm.days[daynumber];
        vm.checkins = [];
        vm.getCheckins(dayOfWeekString);

        let date = {
            year: nextdate.year,
            month: nextdate.month,
            day: nextdate.day - 1,
            dow: daynumber
        };
        // date = vm.dailyCheckinsList[0]['day'];
        vm.dailyCheckinsList.unshift({checkins: vm.checkins, day: date});
        console.log(vm.dailyCheckinsList);
    }
    nextDay(){
        let vm = this;
        let daynumber;
        if((vm.dailyCheckinsList[vm.dailyCheckinsList.length -1]['day'].dow + 1)<=6){

            daynumber = vm.dailyCheckinsList[vm.dailyCheckinsList.length -1]['day'].dow + 1;
            console.log(daynumber);
        } else {
            daynumber = 0;
        }
        let previousdate = vm.dailyCheckinsList[vm.dailyCheckinsList.length -1]['day'];
        let dayOfWeekString = vm.days[daynumber];
        vm.checkins = [];
        vm.getCheckins(dayOfWeekString);
        
        let date = {
            year: previousdate.year,
            month: previousdate.month,
            day: previousdate.day + 1,
            dow: daynumber
        };
        // date = vm.dailyCheckinsList[0]['day'];
        vm.dailyCheckinsList.push({checkins: vm.checkins, day: date});
    }   
    checkinFilter(day){
        let vm = this;
        return function(element){
            let elementDate = new Date(element.creationDate);
            return (elementDate.getFullYear() == day.year &&
                    elementDate.getMonth() == day.month &&
                    elementDate.getDate() == day.day) ? true : false;
        };
    }
}

RightPanelComponentController.$inject = ['httpGeneral', '$scope'];

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