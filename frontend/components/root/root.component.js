class rootComponentController {
    constructor() {
    }
}

const rootComponent = {
    controller: rootComponentController,
    controllerAs: 'rootElement',
    selector: 'rootElement',
    template: '<ng-outlet></ng-outlet>',
    $routeConfig: [{
        path: '/user/',
        name: 'User',
        component: 'userComponent'
    }, {
        path: '/mainpage/',
        name: 'MainPage',
        component: 'mainComponent'
    }, {
        path: '/account/',
        name: 'Account',
        component: 'accountComponent'
    }, {
        path: '/checkins/',
        name: 'Checkins',
        component: 'checkinsComponent'
    }, {
        path: '/tasks/',
        name: 'Tasks',
        component: 'tasksComponent'
    }, {
        path: '/events/',
        name: 'Events',
        component: 'eventsComponent'
    }, {
        path: '/project/',
        name: 'Project',
        component: 'projectComponent'
    }, {
        path: '/trash/',
        name: 'Trash',
        component: 'trashComponent'
    }, {
        path: '/main/',
        name: 'Reports',
        component: 'reportsComponent'
    }, {
        path: '/drafts/',
        name: 'Drafts',
        component: 'draftsComponent'
    }, {
        path: '/messageboard',
        name: 'MsgBoard',
        component: 'messageBoard',
        useAsDefault: true
    }, {
        path: '/menu',
        name: 'Menu',
        component: 'menuComponent'
    }]
};

export {
    rootComponent
};

//{
//    path: '/**',
//        name: 'NotFound',
//    component: 'notFound'
//}