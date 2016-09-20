import './checkinsInfoStyles.styl';

class CheckinsInfoComponentController {
    constructor(httpGeneral, popupNotifications, userService, $location) {
        this.httpGeneral = httpGeneral;
        this.popupNotifications = popupNotifications;
        this.location = $location;
        this.checkin = null;
        this.answers = [];
        this.groupedAsnwers = {};
        this.userService = userService;
        this.iter = [];
        this.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    }
    $routerOnActivate(next) {
        let vm = this;
        let async = require('async');

        async.waterfall([
            function(callback) {
                vm.userService.getExternalUsersData().then(function(data) {
                    vm.externalUsersData = data;
                    console.log('externalUsersData', vm.externalUsersData);
                    callback(null, data);
                });
            },
            function(extUsers, callback) {
                vm.httpGeneral.sendRequest({
                    type: "GET",
                    url: "api/checkins"
                }).then(function(res) {
                    vm.httpGeneral.sendRequest({
                        type: "GET",
                        url: `/api/checkins/${next.params.id}/withparticipants`
                    }).then(function(res) {
                        vm.checkin = res; //{_id: res_id, question: res.question}
                        vm.answers = res.answers;
                        vm.answers.forEach(function(answer) {
                            let date = new Date(answer.creationDate);
                            let month = vm.months[date.getMonth()];
                            let dayofMonths = date.getDate();
                            let dayOfWeek = vm.days[date.getDay()];
                            let d = dayOfWeek + ', ' + month + ' ' + dayofMonths;

                            if (!vm.groupedAsnwers[d]) {
                                vm.iter.push(d);
                                vm.groupedAsnwers[d] = [];
                            }
                            vm.groupedAsnwers[d].push(answer);
                        });

                        if (!vm.externalUsersData) vm.userService.setUsersShortNames(res.participants);
                        else vm.userService.setAvatars(res.participants, vm.externalUsersData);
                    });
                    callback(null, null);
                });
            }
        ]);
    }
    deleteCheckin() {
        let vm = this;
        let onOkFunc = function() {
            vm.httpGeneral.sendRequest({
                type: "DELETE",
                url: '/api/checkins/' + vm.checkin._id
            }).then(function(res) {
                vm.location.path('/checkins');
            });
        };

        vm.popupNotifications.notifyConfirm('atention!', 'Are you sure want to delete this checkin?', 'ok', 'cancel', onOkFunc);
    }
}

CheckinsInfoComponentController.$inject = ['httpGeneral', 'popupNotifications', 'UserService', '$location'];

const checkinsInfoComponent = {
    controller: CheckinsInfoComponentController,
    controllerAs: 'chInfo',
    selector: 'checkinsInfoComponent',
    template: require('./checkinsInfo-pug.component.pug')()
};

export {
    checkinsInfoComponent
};