import "./reportsMainStyle.styl";


class ReportsMainComponentController {
    constructor(http) {
        this.http = http;
    }
};

ReportsMainComponentController.$inject = [
    "httpGeneral"
];

const reportsMainComponent = {
    controller: ReportsMainComponentController,
    selector: "reportsMainComponent",
    template: require("./reportsMain.template.pug")(),
    controllerAs: "reportsMain",
    $routeConfig: [{
            path: "/",
            name: "Reports",
            component: "reportsComponent",
            useAsDefault: true
    },
        {
            path: "/edit",
            name: "Reports Edit",
            component: "reportAddComponent"
    }]
};

export {
    reportsMainComponent
};