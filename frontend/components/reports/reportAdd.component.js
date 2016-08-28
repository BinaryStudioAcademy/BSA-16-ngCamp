import "./reportsStyle.styl";

class ReportAddComponentController {
    constructor(httpGeneral, popupNotifications, reportsGUI) {
        this.httpGeneral = httpGeneral;
        this.popupNotifications = popupNotifications;
        this.gui = reportsGUI;
        this.typeSamples = ['All', 'Message', 'Task', 'Event', 'CheckIn'];
        this.types = [];
        this.userSamples = [];
        this.users = [];
        this.isGenerated = false;
        this.generateReport = generateReport;
    }
    $onInit() {
        console.log(window._injectedData.userId);
        let vm = this;
        vm.projectParticipants = [];
        vm.httpGeneral.sendRequest({
            type: "GET",
            url: "api/user"
        }).then(function (res) {
            for (let i = 0; i < res.length; i++) {
                vm.userSamples[i] = (res[i].firstName || "") + " " + (res[i].secondtName || "");
            }
            vm.userSamples.unshift("All");
        });
    }
}

function generateReport() {
    console.log(this.types);
}

ReportAddComponentController.$inject = ['httpGeneral', 'popupNotifications', 'reportsGUI'];

const reportAddComponent = {
    controller: ReportAddComponentController,
    selector: 'reportAddComponent',
    template: require('./reportAdd.template.pug')(),
    controllerAs: "reportAdd"
};

export {
    reportAddComponent
};
