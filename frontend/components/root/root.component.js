import './rootStyles.styl';

class rootComponentController {
    constructor($location,$rootRouter) {
        this.location = $location;
        this.rootRouter = $rootRouter;
    }

    $onInit(){
        let self = this;
        console.log(window._injectedData.currentProject);
        if (window._injectedData.currentProject === undefined) {
            self.rootRouter.navigateByUrl('/noProject');
        }
    }
}

rootComponentController.$inject = ["$location",'$rootRouter'];

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
        path: '/...',
        name: 'MainPage',
        component: 'checkinsWrapperComponent'
    }, {
        path: '/rightpanel/...',
        name: 'RightPanel',
        component: 'rightPanelComponent'
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
        path: 'noProject',
        name: 'NoProject',
        component: 'noProjectComponent'
    },{
        path: '/**',
        name: 'NotFound',
        component: 'notFound'
    }]
};

export {
    rootComponent
};