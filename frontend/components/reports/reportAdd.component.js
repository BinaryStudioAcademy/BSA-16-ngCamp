import "./reportAddStyle.styl";

class ReportAddComponentController {
    constructor() {

    }
}

ReportAddComponentController.$inject = [

];

const reportAddComponent = {
    controller: ReportAddComponentController,
    selector: 'reportAddComponent',
    template: require('./reportAdd.template.pug')(),
    controllerAs: "reportAdd"
};

export {
    reportAddComponent
};