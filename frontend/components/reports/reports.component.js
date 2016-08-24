import "./reportsStyle.styl";

class ReportsComponentController {
    constructor() {

    }
}

ReportsComponentController.$inject = [

];

const reportsComponent = {
    controller: ReportsComponentController,
    selector: 'reportsComponent',
    template: require('./reports.template.pug')(),
    controllerAs: "reports"
};

export {
    reportsComponent
};