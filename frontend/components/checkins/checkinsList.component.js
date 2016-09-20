import './checkinsStyles.styl';

class CheckinsListComponentController {
    constructor(httpGeneral, userService) {
        this.httpGeneral = httpGeneral;
        this.checkIns = [];
        this.userService = userService;
        this.externalUsersData = [];
    }

    $onInit() {
        let self = this;
        const async = require('async');
        async.waterfall([
            function(callback) {
                self.userService.getExternalUsersData().then(function(data) {
                    self.externalUsersData = data;
                    callback(null, data);
                });
            },
            function(extUsers, callback) {
                self.httpGeneral.sendRequest({
                    type: "GET",
                    url: "api/checkins"
                }).then(function(res) {
                    for (let check in res) {
                        if (res[check].project === window._injectedData.currentProject) {
                            self.checkIns.push(res[check]);
                        }
                        for (var i = 0; i < res.length; i++) {
                            userService.setAvatars(res[i].participants, self.externalUsersData);
                        }
                        console.log('result:', res);
                        callback(null, null);
                    }
                });
            }
        ]);
    }

    turnOn(checkin) {
        let self = this;
        // console.log(checkin);
        self.httpGeneral.sendRequest({
            type: "PUT",
            url: `api/checkins/${checkin._id}`,
            body: {
                isTurnedOn: checkin.isTurnedOn
            }
        }).then(function(res) {
            console.log("Succesfull change status of checkin");
        });
    }

    checkinFilter(mday) {
        let day = new RegExp(mday, 'g');
        return function(element) {
            return (element.frequency.match(day) ? true : false);
        };
    }
}

CheckinsListComponentController.$inject = ['httpGeneral', 'UserService'];

const checkinsListComponent = {
    controller: CheckinsListComponentController,
    selector: 'checkinsListComponent',
    template: require('./checkinsList-pug.component.pug')(),
    controllerAs: 'check',
};

export {
    checkinsListComponent
};