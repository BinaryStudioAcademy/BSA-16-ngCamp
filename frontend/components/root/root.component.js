import './rootStyles.styl';

class rootComponentController {
    constructor() {}
}

const rootComponent = {
    controller: rootComponentController,
    controllerAs: 'rootElement',
    selector: 'rootElement',
    template: '<div id=\'root_container\'><ng-outlet></ng-outlet></div>',
    $routeConfig: [{
        path: '/user/',
        name: 'User',
        component: 'userComponent'
    }, {
        path: '/',
        name: 'MainPage',
        component: 'mainComponent',
    }, {
        path: '/account/',
        name: 'Account',
        component: 'accountComponent'
    }, {
        path: '/header/',
        name: 'Header',
        component: 'headerComponent'
    }, {
        path: '/checkins/',
        name: 'Checkins',
        component: 'checkinsComponent'
    }, {
        path: '/tasks/',
        name: 'Tasks',
        component: 'tasksComponent'
    }, {
        path: '/events/...',
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
        path: '/reports',
        name: 'Reports',
        component: 'reportsComponent'
    }, {
        path: '/drafts/',
        name: 'Drafts',
        component: 'draftsComponent'
    }, {
        path: '/messageboard', //...
        name: 'MsgBoard',
        component: 'messageBoard'
    }, {
        path: '/comments',
        name: 'Comments',
        component: 'commentsComponent'
    }, {
        path: '/files',
        name: 'File', //TODO test, remove later
        component: 'files'
    }, {
        path: '/postMessage',
        name: 'PostMessage', //TODO test, remove later
        component: 'postMessage'
    }, {
        path: '/editMessage',
        name: 'EditMessage', //TODO test, remove later
        component: 'editMessage'
    }, {
        path: '/tasks',
        name: 'Tasks',
        component: 'tasksComponent'
    }, {
        path: '/test',
        name: 'Test',
        component: 'test'
    }, {
        path: '/**',
        name: 'NotFound',
        component: 'notFound'
    }]
};

export {
    rootComponent
};