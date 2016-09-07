import "./reportsStyle.styl";

class ReportEditComponentController {
    constructor(httpGeneral, popupNotifications, reportsGUI) {
        this.httpGeneral = httpGeneral;
        this.popupNotifications = popupNotifications;
        this.gui = reportsGUI;
        this.typeSamples = ['All', 'Message', 'Task', 'Event', 'CheckIn'];
        this.types = [];
        this.reportId = "";
        this.isSaved = false;
        this.userSamples = [];
        this.users = [];
        this.isGenerated = false;
        this.userId = window._injectedData.userId;
        this.projectId = window._injectedData.currentProject;
        this.manageReportSaving = manageReportSaving;
        this.reportGenerate = reportGenerate;
    }
    $routerOnActivate(next) {
        let vm = this;
        vm.reportId = next.params.id;
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
                url: "api/projects/" + vm.projectId + "/users"
            }).then(function (res) {
                console.log(res);
                vm._usersData = res.participants;
                for (let i = 0; i < res.participants.length; i++) {
                    vm.userSamples[i] = (res.participants[i].firstName || "") + " " + (res.participants[i].secondtName || "");
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

function reportGenerate() {
    let vm = this;
    let data = {
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
            data.dataRange = vm.dateRange;

        } else {
            vm.dateRange = undefined;
        }
    }
    data.isSaved = vm.isSaved;
    //console.log(data);
    vm.httpGeneral.sendRequest({
        type: "PUT",
        url: "/api/report/" + vm.reportId,
        body: {
            data: data
        }
    }).then(function (res) {
        vm.popupNotifications.notifySuccess("Report modyfied");
    });
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
