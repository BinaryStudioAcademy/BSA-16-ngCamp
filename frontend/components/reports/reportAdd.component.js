import "./reportsStyle.styl";

class ReportAddComponentController {
    constructor(httpGeneral, popupNotifications) {

    }
}

ReportAddComponentController.$inject = ['httpGeneral', 'popupNotifications'];

const reportAddComponent = {
    controller: ReportAddComponentController,
    selector: 'reportAddComponent',
    template: require('./reportAdd.template.pug')(),
    controllerAs: "reportAdd"
};

export {
    reportAddComponent
};
