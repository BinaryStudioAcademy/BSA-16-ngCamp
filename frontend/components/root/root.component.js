class rootComponentController {
	constructor() {}
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
		path: '/**',
		name: 'NotFound',
		component: 'notFound'
	}]
};

export {
	rootComponent
};