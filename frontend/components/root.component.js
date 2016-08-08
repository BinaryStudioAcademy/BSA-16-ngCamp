angular.module('base')
	.component('rootElement', {
		template: '<ng-outlet></ng-outlet>',
		restrict: 'E',
		controller: function() {
		},
		$routeConfig: [
		{path: '/user/...', name: 'User', component: 'someEl', useAsDefault: true},
		// // {path: '/mainpage/...', name: 'MainPage', component: 'mainComponent'},
		// // {path: '/account/...', name: 'Account', component: 'accountComponent'},
		// // {path: '/checkins/...', name: 'Checkins', component: 'checkinsComponent'},
		// // {path: '/tasks/...', name: 'Tasks', component: 'tasksComponent'},
		// // {path: '/events/...', name: 'Events', component: 'eventsComponent'},
		// // {path: '/project/...', name: 'Project', component: 'projectComponent'},
		// // {path: '/trash/...', name: 'Trash', component: 'mainComponent'},
		// // {path: '/main/...', name: 'Reports', component: 'reportsComponent'},
		// // {path: '/drafts/...', name: 'Drafts', component: 'draftsComponent'},
		{path: '/**', component: 'notfound', name: 'NotFound'}
		],
});