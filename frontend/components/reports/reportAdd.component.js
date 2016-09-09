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
        this.projectId = window._injectedData.currentProject;
        this.generateReport = generateReport;
        this.manageReportSaving = manageReportSaving;
    }
    $onInit() {
        let vm = this;
        vm.httpGeneral.sendRequest({
            type: "GET",
            url: "api/projects/" + vm.projectId + "/users"
        }).then(function (res) {
            //console.log(res);
            vm._usersData = res.participants;
            for (let i = 0; i < res.participants.length; i++) {
                vm.userSamples[i] = (res.participants[i].firstName || "") + " " + (res.participants[i].secondtName || "");
            }
            vm.userSamples.unshift("All");
        });
    }
}

function generateReport() {
    let vm = this;
    let data = {
        user: vm.userId,
        project: vm.projectId,
        participants: []
    };
    if (vm.title) {
        data.title = vm.title;
    } else {
        vm.popupNotifications.notifyError("Please define report title");
        return;
    }
    if (vm.description) {
        data.description = vm.description;
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
            data.dateRange = vm.dateRange;

        } else {

            vm.dateRange = undefined;
        }
    }
    data.isSaved = vm.isSaved;
    //console.log(data);

    vm.httpGeneral.sendRequest({
        type: "POST",
        url: "/api/report/",
        body: {
            data: data
        }
    }).then(function (res) {
        if (res.gen.data) {
            vm.history = res.gen.data;
            console.log(vm.history);
            vm.popupNotifications.notifySuccess("Report added");
            vm.isGenerated = true;
        }
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
