import './checkinsStyles.styl';

class CheckinsComponentController {
    constructor(httpGeneral, $rootRouter) {
        this.httpGeneral = httpGeneral;
        this.rootRouter = $rootRouter;
    }
    $onInit() {
        let self = this;
        if (window._injectedData.currentProject === undefined) {
            self.rootRouter.navigateByUrl('/noProject');
        }
    }
}

CheckinsComponentController.$inject = [
    'httpGeneral', '$rootRouter',
];

const checkinsComponent = {
    controller: CheckinsComponentController,
    selector: 'checkinsComponent',
    template: require('./checkins-pug.component.pug')(),
    $routeConfig: [{
        path: '/',
        name: 'Checkins List',
        component: 'checkinsListComponent',
        useAsDefault: true
    }, {
        path: '/info/:id',
        name: 'CheckinsInfo',
        component: 'checkinsInfoComponent'

    }, {
        path: '/create/',
        name: 'CheckinsCreate',
        component: 'checkinsCreateComponent'
    }, {
        path: '/edit/:id',
        name: 'CheckinsEdit',
        component: 'checkinsEditComponent'
    }, {
        path: '/answer/:id',
        name: 'CheckinsAnswer',
        component: 'checkinsAnswerComponent'
    }]
};

export {
    checkinsComponent
};