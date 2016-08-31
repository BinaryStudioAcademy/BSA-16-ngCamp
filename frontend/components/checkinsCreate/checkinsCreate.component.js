import './checkinsCreateStyles.styl';

class CheckinsCreateComponentController {
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
        this.selectedFrequency = this.frequency[0];
        this.time = '10:30';
        this.parties = [];
    }
    $onInit(){
    	let vm = this;
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
            type: "POST",
            url: "/api/checkins/",
            body: {
                data: {
                    question: vm.question,
                    project: [window._injectedData.currentProject],
                    frequency: vm.selectedFrequency,
                    participants: vm.parties,
                    isTurnedOn: true,
                    time: vm.time
                }
            }
        }).then(function(res) {
            console.log("Succesfull create checkin");
        });
        // vm.window.location.reload();
        // vm.location.path('/');
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

CheckinsCreateComponentController.$inject = ['httpGeneral', '$window'];

const checkinsCreateComponent = {
    controller: CheckinsCreateComponentController,
    controllerAs: 'CheckCr',
    selector: 'checkinsCreateComponent',
    template: require('./checkinsCreate-pug.component.pug')(),

};

export {
    checkinsCreateComponent
};