import "./reportsStyle.styl";

class ReportsComponentController {
    constructor(httpGeneral, popupNotifications) {
        this.usedId = "57af0ec9ddc523292575d42b";
        this.httpGeneral = httpGeneral;

    }
    $onInit() {
        let vm = this;
        vm.httpGeneral.sendRequest({
            type: "GET",
            url: "api/report/" + vm.usedId + "/saved"
        }).then(function (res, err) {
            vm.httpGeneral.sendRequest({
                type: "GET",
                url: "api/report/" + vm.usedId + "/recent"
            }).then(function (result, error) {
                console.log(res);
                console.log(result);
            });
        });
    }
}

ReportsComponentController.$inject = ['httpGeneral', 'popupNotifications'];

const reportsComponent = {
    controller: ReportsComponentController,
    selector: 'reportsComponent',
    template: require('./reports.template.pug')(),
    controllerAs: "reports"
};

export {
    reportsComponent
};
