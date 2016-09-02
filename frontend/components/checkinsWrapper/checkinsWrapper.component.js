import "./checkinsWrapper.styl";


class checkinsWraperComponentController{
    constructor(){

    }
};

checkinsWraperComponentController.$inject = [];

const checkinsWrapperComponent = {
    controller: checkinsWraperComponentController,
    selector: "checkinsWrapperComponent",
    template: require("./checkinsWrapper.template.pug")(),
    $routeConfig: [{
        path: '/...',
        name: 'Calendar',
        component: 'primaryCalendar',
        useAsDefault: true
    }]
};

export {
    checkinsWrapperComponent
};