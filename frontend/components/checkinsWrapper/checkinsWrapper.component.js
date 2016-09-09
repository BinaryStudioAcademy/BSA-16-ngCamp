import "./checkinsWrapper.styl";


class checkinsWraperComponentController{
    constructor($rootRouter){
        this.rootRouter = $rootRouter;
    }   

    $onInit(){
        let self = this;
        if (window._injectedData.currentProject === undefined) {
            self.rootRouter.navigateByUrl('/noProject');
        }
    }
};

checkinsWraperComponentController.$inject = ['$rootRouter'];

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