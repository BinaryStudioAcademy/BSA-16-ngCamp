import "./reportsStyle.styl";


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
            path: "/add",
            name: "Reports Add",
            component: "reportAddComponent"
    },
        {
            path: "/edit/:id",
            name: "Reports Edit",
            component: "reportEditComponent"
    }]
};

export {
    reportsMainComponent
};
