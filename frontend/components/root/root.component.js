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
        component: 'checkinsWrapperComponent',
    }, {
        path: '/account/',
        name: 'Account',
        component: 'accountComponent'
    }, {
        path: '/header/',
        name: 'Header',
        component: 'headerComponent'
    },  {
        path: '/checkins/...',
        name: 'Checkins',
        component: 'checkinsComponent'
    //}, {
    //    path: '/checkinsCreate/',
    //    name: 'CheckinsCreate',
    //    component: 'checkinsCreateComponent'
    //}, {
    //    path: '/checkinsEdit/:id',
    //    name: 'CheckinsEdit',
    //    component: 'checkinsEditComponent'
    //}, {
    //    path: '/checkinsInfo/:id',
    //    name: 'CheckinsInfo',
    //    component: 'checkinsInfoComponent'
    }, {
        path: '/tasks/...',
        name: 'Tasks',
        component: 'tasksRootComponent'
    }, {
        path: '/events/...',
        name: 'Events',
        component: 'eventsComponent'
    }, {
        path: '/project/',
        name: 'Project',
        component: 'projectComponent'
    },
    {
        path: '/createproject/',
        name: 'CreateProject',
        component: 'createProjectComponent'
    },
    {
        path: '/trash/',
        name: 'Trash',
        component: 'trashComponent'
    }, {
        path: '/reports/...',
        name: 'Reports',
        component: 'reportsMainComponent'
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
    },{
        path:'comments/:id/message',
        name: 'Message comments',
        component: 'messageCommentsComponent'
    },
    {
        path: '/files',
        name: 'File', //TODO test, remove later
        component: 'files'
    }, {
        path: '/postMessage',
        name: 'PostMessage', //TODO test, remove later
        component: 'postMessage'
    }, {
        path: '/editMessage/:id',
        name: 'EditMessage', //TODO test, remove later
        component: 'editMessage'
    }, {
        path: '/calendar/...',
        name: 'Calendar',
        component: 'primaryCalendar'
    },{
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