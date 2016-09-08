//import './checkinsStyles.styl';

class RightPanelComponentController {
    constructor(httpGeneral, $scope) {
        let vm = this;
        vm.httpGeneral = httpGeneral;
        vm.date = new Date();
        vm.scp = $scope;
        vm.checkins = [];
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
            //console.log(vm.checkins[0]);
        });
    }
    checkinFilter(){
        let vm = this;
        return function(element){
            let elementDate = new Date(element.creationDate);
            return (elementDate.getFullYear() == vm.date.year &&
                    elementDate.getMonth() == vm.date.month &&
                    elementDate.getDate() == vm.date.day &&
                    element.answer != 'noAnswer') ? true : false;
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