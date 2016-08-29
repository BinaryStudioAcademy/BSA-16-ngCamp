import "./reportsStyle.styl";

class ReportsComponentController {
    constructor(httpGeneral, popupNotifications, reportsGUI) {
            this.usedId = window._injectedData.userId;
            this.httpGeneral = httpGeneral;
            this.gui = reportsGUI;
            this._reports = [];
            this._saved = [];
            this.recentReports = [];
            this.savedReports = [];
        }
        //========================================================================
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
                    vm._reports = result;
                    vm.recentReports = vm._reports.slice(0, 3);
                    if (res) {
                        res.forEach(function (elem, index) {

                            elem.participants.forEach(function (e, i) {
                                elem.participants[i] = (e.firstName ? e.firstName : " ") + (e.lastName ? e.lastName : " ");
                            });
                        });
                        vm._saved = res;
                        vm.savedReports = vm._saved.slice(0, 4);
                    }
                });
            });
        }
        //====================================================================
}



ReportsComponentController.$inject = ['httpGeneral', 'popupNotifications', 'reportsGUI'];

const reportsComponent = {
    controller: ReportsComponentController,
    selector: 'reportsComponent',
    template: require('./reports.template.pug')(),
    controllerAs: "reports"
};

export {
    reportsComponent
};
