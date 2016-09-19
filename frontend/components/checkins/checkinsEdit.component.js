import './checkinsCreateStyles.styl';

class CheckinsEditComponentController {
    constructor(httpGeneral, $window, $location) {
        this.httpGeneral = httpGeneral;
        this.window = $window;
        this.location = $location;
        this.participants = [];
        this.question = '';
        this.frequency = [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday'
            ];
        this.selectedFrequency = '';
        this.time = [
            '08:00',
            '09:00',
            '10:00',
            '11:00',
            '12:00',
            '13:00',
            '14:00',
            '15:00',
            '16:00',
            '17:00',
            '18:00',
            '19:00'
        ];
        this.selectedTime = '';
        this.parties = [];
        this.checkin = null;
    }
    $routerOnActivate(next){
        let vm = this;
        vm.httpGeneral.sendRequest({
            type:"GET",
            url:`/api/checkins/${next.params.id}/withparticipants`
        }).then(function(res){
            vm.checkin = res;
            vm.selectedFrequency = res.frequency;
            vm.question = res.question;
            vm.selectedTime = res.time;
            res.participants.forEach(function(p){
                vm.parties.push(p._id);
            });
        });
        vm.httpGeneral.sendRequest({
            type: "GET",
            url: `api/projects/${window._injectedData.currentProject}/participants`,
        }).then(function(res) {
            vm.participants = res.participants;
        });
    }

    save(){
        let vm = this;
        vm.httpGeneral.sendRequest({
            type: "PUT",
            url: "/api/checkins/" + vm.checkin._id,
            body: {
                    question: vm.question,
                    frequency: vm.selectedFrequency,
                    participants: vm.parties,
                    time: vm.selectedTime
            }
        }).then(function(res) {
            console.log(res);
            vm.location.path('/checkins');
        });
    }
    toggleAll(){
        let vm = this;
        if (vm.parties.length == vm.participants.length){
            vm.parties = []; 
        } else {
            vm.participants.forEach(function(p){
                if(vm.parties.indexOf(p._id) == -1){
                    vm.parties.push(p._id);
                }                 
            });
        }
    }
    toggleChekin(id){
        let vm = this;
        let idx = vm.parties.indexOf(id);
        if (idx > -1) {
            vm.parties.splice(idx, 1);
        } else {
            vm.parties.push(id);
        }
    }
}

CheckinsEditComponentController.$inject = ['httpGeneral', '$window', '$location'];

const checkinsEditComponent = {
    controller: CheckinsEditComponentController,
    controllerAs: 'CheckEd',
    selector: 'checkinsEditComponent',
    template: require('./checkinsEdit-pug.component.pug')(),
};

export {
    checkinsEditComponent
};