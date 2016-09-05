import './checkinsStyles.styl';

class CheckinsListComponentController {
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
                if (res[check].project === window._injectedData.currentProject) {
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
    checkinFilter(mday){
        let day = new RegExp(mday, 'g');
        return function(element){
            return (element.frequency.match(day) ? true : false);
        };
    }
}

CheckinsListComponentController.$inject = ['httpGeneral'];

const checkinsListComponent = {
    controller: CheckinsListComponentController,
    selector: 'checkinsListComponent',
    template: require('./checkinsList-pug.component.pug')(),
    controllerAs: 'check',
};

export {
    checkinsListComponent
};