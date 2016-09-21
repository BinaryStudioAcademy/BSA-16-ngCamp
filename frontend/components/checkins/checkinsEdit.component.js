import './checkinsCreateStyles.styl';

class CheckinsEditComponentController {
    constructor(httpGeneral, $window, $location) {
        this.httpGeneral = httpGeneral;
        this.window = $window;
        this.location = $location;
        this.participants = [];
        this.question = '';
        this.frequency = [
            {name: "<strong>All Days</strong>", msGroup: true},
            {name: "<strong>Every Working Day</strong>", msGroup: true},
            {id: "mo", icon: "<img src='https://maxcdn.icons8.com/Color/PNG/48/Time_And_Date/monday-48.png'>", name: "Monday", maker: "Mo"},
            {id: "tu", icon: "<img src='https://maxcdn.icons8.com/Color/PNG/48/Time_And_Date/tuesday-48.png'>", name: "Tuesday", maker: "Tu"},
            {id: "we", icon: "<img src='https://maxcdn.icons8.com/Color/PNG/48/Time_And_Date/wednesday-48.png'>", name: "Wednesday", maker: "We"},
            {id: "th", icon: "<img src='https://maxcdn.icons8.com/Color/PNG/48/Time_And_Date/thursday-48.png'>", name: "Thursday", maker: "Th"},
            {id: "fr", icon: "<img src='https://maxcdn.icons8.com/Color/PNG/48/Time_And_Date/friday-48.png'>", name: "Friday", maker: "Fr"},
            {msGroup: false},
            {name: "<strong>Every Weekend</strong>", msGroup: true},
            {id: "sa", icon: "<img src='https://maxcdn.icons8.com/Color/PNG/48/Time_And_Date/saturday-48.png'>", name: "Saturday", maker: "Sa"},
            {id: "su", icon: "<img src='https://maxcdn.icons8.com/Color/PNG/48/Time_And_Date/sunday-48.png'>", name: "Sunday", maker: "Su"},
            {msGroup: false},
            {msGroup: false}
        ];
        this.selectedFrequency = '';
        this.time = [
            {name: "08:00"},
            {name: "09:00"},
            {name: "10:00"},
            {name: "11:00"},
            {name: "12:00"},
            {name: "13:00"},
            {name: "14:00"},
            {name: "15:00"},
            {name: "16:00"},
            {name: "17:00"},
            {name: "18:00"},
            {name: "19:00"}
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