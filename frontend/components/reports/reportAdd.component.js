import "./reportsStyle.styl";

class ReportAddComponentController {
    constructor(httpGeneral, popupNotifications, reportsGUI) {
        this.httpGeneral = httpGeneral;
        this.popupNotifications = popupNotifications;
        this._usersData = [];
        this.gui = reportsGUI;
        this.typeSamples = ['All', 'Message', 'Task', 'Event', 'CheckIn'];
        this.types = [];
        this.isSaved = false;
        this.userSamples = [];
        this.dateRange = [];
        this.users = [];
        this.isGenerated = false;
        this.userId = window._injectedData.userId;
        this.generateReport = generateReport;
        this.manageReportSaving = manageReportSaving;
    }
    $onInit() {
        let vm = this;
        vm.httpGeneral.sendRequest({
            type: "GET",
            url: "api/user"
        }).then(function (res) {
            vm._usersData = res;
            for (let i = 0; i < res.length; i++) {
                vm.userSamples[i] = (res[i].firstName || "") + " " + (res[i].secondtName || "");
            }
            vm.userSamples.unshift("All");
        });
    }
}

function generateReport() {
    let vm = this;
    let data = {
        user: vm.userId,
        participants: []
    };
    if (vm.title) {
        data.title = vm.title;
    } else {
        vm.popupNotifications.notifyError("Please define report title");
        return;
    }
    if (((!vm.types || vm.types.length <= 0) && (!vm.users || vm.users.length <= 0)) && (!vm.dateRange || vm.dateRange.length <= 0)) {
        vm.popupNotifications.notifyError("Report filter is undefined");
        return;
    } else {
        if (vm.types && vm.types.length > 0) {
            data.types = vm.types;
        }
        if (vm.users && vm.users.length > 0) {
            for (let i = 0; i < vm._usersData.length; i++) {
                let item = ((vm._usersData[i].firstName || "") + " " + (vm._usersData.secondtName || ""));
                if (vm.users.indexOf(item) != -1) {

                    data.participants.push(vm._usersData[i]._id);
                }
            }
        } else {
            vm.users = undefined;
        }
        if (vm.dateRange && vm.dateRange.length > 0) {
            data.dataRange = vm.dateRange;

        } else {
            vm.dateRange = undefined;
        }
    }
    data.isSaved = vm.isSaved;
    console.log(data);
    vm.httpGeneral.sendRequest({
        type: "POST",
        url: "/api/report/",
        body: {
            data: data
        }
    }).then(function (res) {
        vm.popupNotifications.notifySuccess("Report added");
    });
}

function manageReportSaving() {
    let vm = this;
    if (vm.isSaved) {
        vm.isSaved = false;
    } else {
        vm.isSaved = true;
    }
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
