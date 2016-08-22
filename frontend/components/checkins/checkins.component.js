import './checkinsStyles.styl';

class CheckinsComponentController {
    constructor(httpGeneral) {
        this.httpGeneral = httpGeneral;
        this.checkIns = [];
    }
    $onInit() {
        let self = this;
        self.httpGeneral.sendRequest({
            type: "GET",
            url: "api/checkins"
        }).then(function(res) {
            for (let check in res) {
                if (res[check].project[0] === window._injectedData.currentProject) {
                    self.checkIns.push(res[check]);
                }
            }
        });
    }
    turnOn(checkin) {
        let self = this;
        console.log(checkin);
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
}

CheckinsComponentController.$inject = ['httpGeneral'];

const checkinsComponent = {
    controller: CheckinsComponentController,
    selector: 'checkinsComponent',
    template: require('./checkins-pug.component.pug')(),
    controllerAs: 'check',
};

export {
    checkinsComponent
};