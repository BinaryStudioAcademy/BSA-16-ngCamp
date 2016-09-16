import './checkinsCreateStyles.styl';

class CheckinsCreateComponentController {
    constructor(httpGeneral, popupNotifications, $window, $location) {
        this.httpGeneral = httpGeneral;
        this.popupNotifications = popupNotifications;
        this.window = $window;
        this.location = $location;
        this.participants = [];
        this.question = '';
        this.frequency = [
            'Every weekday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday'
        ];
        this.selectedFrequency = this.frequency[0];
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
        this.selectedTime = this.time[0];
        this.parties = [];
    }

    $onInit() {
        let vm = this;
        vm.httpGeneral.sendRequest({
            type: "GET",
            url: `api/projects/${window._injectedData.currentProject}/participants`
        }).then(function (res) {
            vm.participants = res.participants;
        });
    }

    save() {
        let vm = this;
        if (vm.question && vm.participants) {
            vm.httpGeneral.sendRequest({
                type: "POST",
                url: "/api/checkins/",
                body: {
                    data: {
                        question: vm.question,
                        project: window._injectedData.currentProject,
                        frequency: vm.selectedFrequency,
                        participants: vm.parties,
                        isTurnedOn: false,
                        time: vm.selectedTime
                    }
                }
            }).then(function() {
                vm.location.path('/checkins');
            });
        }
        else {
            vm.popupNotifications.notifyError("You must define your question and participants");
        }

    }

    toggleAll() {
        let vm = this;
        if (vm.parties.length == vm.participants.length) {
            vm.parties = [];
        } else {
            vm.participants.forEach(function (p) {
                if (vm.parties.indexOf(p._id) == -1) {
                    vm.parties.push(p._id);
                }
            });
        }
    }

    toggleChekin(id) {
        let vm = this;
        let idx = vm.parties.indexOf(id);
        if (idx > -1) {
            vm.parties.splice(idx, 1);
        } else {
            vm.parties.push(id);
        }
    }
}

CheckinsCreateComponentController.$inject = ['httpGeneral', 'popupNotifications', '$window', '$location'];

const checkinsCreateComponent = {
    controller: CheckinsCreateComponentController,
    controllerAs: 'CheckCr',
    selector: 'checkinsCreateComponent',
    template: require('./checkinsCreate-pug.component.pug')(),

};

export {
    checkinsCreateComponent
};