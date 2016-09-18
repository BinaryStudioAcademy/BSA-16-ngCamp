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
        this.checkin = {
            isLoaded: false,
            isCheckinPick: false,
            questions: [],
            report: []
        };
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
        }).then(function(res, err) {
            res[0].dateRange[0] = new Date(res[0].dateRange[0]);
            res[0].dateRange[1] = new Date(res[0].dateRange[1]);
            vm.creationDate = new Date(res[0].creationDate);
            vm.title = (res[0].title || "");
            vm.description = (res[0].description || "");
            vm.isSaved = (res[0].isSaved || false);

            vm.types = (res[0].types || []);
            vm.typeSamples = vm.typeSamples.filter(function(el) {
                return vm.types.indexOf(el) < 0;
            });
            for (let i = 0; i < res[0].participants.length; i++) {
                vm.users[i] = (res[0].participants[i].firstName || "") + " " + (res[0].participants[i].secondtName || "");
            }
            vm.dateRange = (res[0].dateRange || []);
            if (res[0].dateRange[0].getTime() == 0);
            vm.dateRange[0] = undefined;
            if (res[0].dateRange[1].getTime() == 0);
            vm.dateRange[1] = undefined;
            vm.httpGeneral.sendRequest({
                type: "GET",
                url: "api/projects/" + vm.projectId + "/users"
            }).then(function(res) {
                vm._usersData = res.participants;
                for (let i = 0; i < res.participants.length; i++) {
                    vm.userSamples[i] = (res.participants[i].firstName || "") + " " + (res.participants[i].secondtName || "");
                }

                vm.userSamples.unshift("All");
                vm.userSamples = vm.userSamples.filter(function(el) {
                    return vm.users.indexOf(el) < 0;
                });
            });

            if (res[0].questions && res[0].questions.length > 0) {
                vm.checkin.report = res[0].questions;
                vm.httpGeneral.sendRequest({
                    type: "GET",
                    url: "api/checkins/project/" + window._injectedData.currentProject + "/questions"
                }).then(function(result) {
                    if (result.length > 0) {
                        vm.checkin.questions = result;
                        vm.checkin.isLoaded = true;
                        vm.checkin.isCheckinPick = true;
                    }
                });
            }
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
        user: vm.userId,
        participants: [],
        project: vm.projectId
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
            vm.users = [];
        }
        if (vm.dateRange && vm.dateRange.length > 0) {
            data.dateRange = vm.dateRange.slice(0, 2);

        } else {
            vm.dateRange = [];
        }
        if (vm.checkin.report && vm.checkin.report.length > 0) {
            data.questions = vm.checkin.report.slice(0, 2);

        } else {

            vm.checkin.report = [];
        }
    }
    data.isSaved = vm.isSaved;
    vm.httpGeneral.sendRequest({
        type: "PUT",
        url: "/api/report/" + vm.reportId,
        body: data
    }).then(function(res) {
        if (res.gen.data) {
            vm.history = res.gen.data;
            vm.popupNotifications.notifySuccess("Report updated");
            vm.isGenerated = true;
        }
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