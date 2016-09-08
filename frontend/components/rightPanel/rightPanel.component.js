//import './checkinsStyles.styl';

class RightPanelComponentController {
    constructor(httpGeneral, $scope) {
        let vm = this;
        vm.httpGeneral = httpGeneral;
        vm.date = new Date();
        vm.scp = $scope;
        vm.checkins = [];
        vm.checkinsSet = new Set();
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
            vm.getCheckins(vm.days[vm.date.dow]);
            vm.checkinsSet.add({day: vm.checkins});
            console.log(vm.checkinsSet+ 'dfgdfg');
        });
    }
    getCheckins(day){
        let vm = this;
        vm.httpGeneral.sendRequest({
            type: "GET",
            url: 'api/checkins/freq/' + day
        }).then(function(res) {
            console.log(res);
            res.forEach(function(check){
                vm.checkins.push(check);
                //console.log(check);
            });
            
        });

    }
    checkinFilter(){
        let vm = this;
        return function(element){
            let elementDate = new Date(element.creationDate);
            return (elementDate.getFullYear() == vm.date.year &&
                    elementDate.getMonth() == vm.date.month &&
                    elementDate.getDate() == vm.date.day) ? true : false;
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