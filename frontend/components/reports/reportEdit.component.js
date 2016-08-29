import "./reportsStyle.styl";

class ReportEditComponentController {
    constructor(httpGeneral, popupNotifications, reportsGUI) {
        this.httpGeneral = httpGeneral;
        this.popupNotifications = popupNotifications;
        this.gui = reportsGUI;
        this.typeSamples = ['All', 'Message', 'Task', 'Event', 'CheckIn'];
        this.types = [];
        this.isSaved = false;
        this.userSamples = [];
        this.users = [];
        this.isGenerated = false;
        this.userId = window._injectedData.userId;
        this.manageReportSaving = manageReportSaving;
    }
    $routerOnActivate(next) {
        let vm = this;
        vm.httpGeneral.sendRequest({
            type: "GET",
            url: "api/report/item/" + next.params.id
        }).then(function (res, err) {
            res[0].dateRange[0] = new Date(res[0].dateRange[0]);
            res[0].dateRange[1] = new Date(res[0].dateRange[1]);
            vm.creationDate = new Date(res[0].creationDate);
            vm.title = (res[0].title || "");
            vm.description = (res[0].description || "");
            vm.isSaved = (res[0].isSaved || false);

            vm.types = (res[0].types || []);
            vm.typeSamples = vm.typeSamples.filter(function (el) {
                return vm.types.indexOf(el) < 0;
            });
            for (let i = 0; i < res[0].participants.length; i++) {
                vm.users[i] = (res[0].participants[i].firstName || "") + " " + (res[0].participants[i].secondtName || "");
            }
            vm.dateRange = (res[0].dateRange || []);
            vm.httpGeneral.sendRequest({
                type: "GET",
                url: "api/user"
            }).then(function (res) {
                for (let i = 0; i < res.length; i++) {
                    vm.userSamples[i] = (res[i].firstName || "") + " " + (res[i].secondtName || "");
                }
                vm.userSamples.unshift("All");
                vm.userSamples = vm.userSamples.filter(function (el) {
                    return vm.users.indexOf(el) < 0;
                });
            });
        });
    }
    $onInit() {}
}

function manageReportSaving() {
    let vm = this;
    if (vm.isSaved) {
        vm.isSaved = false;
    } else {
        vm.isSaved = true;
    }
}

ReportEditComponentController.$inject = ['httpGeneral', 'popupNotifications', 'reportsGUI'];

const reportEditComponent = {
    controller: ReportEditComponentController,
    selector: 'reportEditComponent',
    template: require('./reportEdit.template.pug')(),
    controllerAs: "reportEdit"
};

export {
    reportEditComponent
};
