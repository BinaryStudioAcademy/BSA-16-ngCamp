import "./reportsStyle.styl";

class ReportsComponentController {
    constructor(httpGeneral, popupNotifications, reportsGUI) {
            this.usedId = window._injectedData.userId;
            this.projectId = window._injectedData.currentProject;
            this.httpGeneral = httpGeneral;
            this.popupNotifications = popupNotifications;
            this.gui = reportsGUI;
            this._reports = [];
            this._saved = [];
            this.recentReports = [];
            this.savedReports = [];
            this.isRecentMore = false;
            this.isSavedMore = false;
            this.manageMore = manageMore;
            this.deleteReport = deleteReport;
        }
        //========================================================================
    $onInit() {
            let vm = this;
            vm.httpGeneral.sendRequest({
                type: "GET",
                url: "api/report/" + vm.projectId + "/saved/" + vm.usedId
            }).then(function (res, err) {
                vm.httpGeneral.sendRequest({
                    type: "GET",
                    url: "api/report/" + vm.projectId + "/recent/" + vm.usedId
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

function manageMore(type) {
    let vm = this;
    if (type == "recent") {
        if (vm.isRecentMore) {
            vm.recentReports = vm._reports.slice(0, 3);
            vm.isRecentMore = false;
        } else {
            vm.recentReports = vm._reports.slice(0, vm._reports.length);
            vm.isRecentMore = true;
        }
    }
    if (type == "saved") {
        if (vm.isSavedMore) {
            vm.savedReports = vm._saved.slice(0, 4);
            vm.isSavedMore = false;
        } else {
            vm.savedReports = vm._saved.slice(0, vm._saved.length);
            vm.isSavedMore = true;
        }
    }
}


function deleteReport(id) {
    let vm = this;
    vm.httpGeneral.sendRequest({
        type: "DELETE",
        url: "api/report/" + id
    }).then(function (res) {
        removeFromArray(id, vm.recentReports);
        removeFromArray(id, vm._reports);
        vm.recentReports = vm._reports.slice(0, 3);
        vm.isRecentMore = false;
        removeFromArray(id, vm.savedReports);
        removeFromArray(id, vm._saved);
        vm.savedReports = vm._saved.slice(0, 4);
        vm.isSavedMore = false;
        vm.popupNotifications.notifySuccess("Report deleted");
    });
}

function removeFromArray(id, arr) {
    let index = -1;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i]._id == id) {
            index = i;
            break;
        }
    }
    if (index != -1) {
        arr.splice(index, 1);
    }
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
