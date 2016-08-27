import "./reportsStyle.styl";

class ReportEditComponentController {
    constructor(httpGeneral, popupNotifications) {
        this.httpGeneral = httpGeneral;
        this.report = {};
    }
    $routerOnActivate(next) {
        let vm = this;
        vm.httpGeneral.sendRequest({
            type: "GET",
            url: "api/report/item/" + next.params.id
        }).then(function (res, err) {
            res[0].dateRange[0] = new Date(res[0].dateRange[0]);
            res[0].dateRange[1] = new Date(res[0].dateRange[1]);
            vm.report = res[0];
            console.log(vm.report);
        });
    }
}

ReportEditComponentController.$inject = ['httpGeneral', 'popupNotifications'];

const reportEditComponent = {
    controller: ReportEditComponentController,
    selector: 'reportEditComponent',
    template: require('./reportEdit.template.pug')(),
    controllerAs: "reportEdit"
};

export {
    reportEditComponent
};
