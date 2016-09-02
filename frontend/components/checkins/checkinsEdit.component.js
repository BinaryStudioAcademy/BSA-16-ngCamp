import './checkinsCreateStyles.styl';

class CheckinsEditComponentController {
    constructor(httpGeneral, $window) {
        this.httpGeneral = httpGeneral;
        this.window = $window;
        this.participants = [];
        this.question = '';
        this.frequency = [
            'Every weekday',
            'Every Monday',
            'Every Friday',
            'Every other Monday',
            'Every other Friday',
            'First Monday of every month'
            ];
        this.selectedFrequency = '';
        this.time = '10:30';
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
            vm.time = res.time;
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
                    time: vm.time
            }
        }).then(function(res) {
            console.log(res);
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

CheckinsEditComponentController.$inject = ['httpGeneral', '$window'];

const checkinsEditComponent = {
    controller: CheckinsEditComponentController,
    controllerAs: 'CheckEd',
    selector: 'checkinsEditComponent',
    template: require('./checkinsEdit-pug.component.pug')(),
};

export {
    checkinsEditComponent
};