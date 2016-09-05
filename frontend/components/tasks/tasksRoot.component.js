import './tasksStyles.styl';

class tasksComponentController{
	constructor(){

	}
};

tasksComponentController.$inject = [
];

const tasksRootComponent = {
	controller: tasksComponentController,
	template: '<ng-outlet></ng-outlet>',
	selector: "tasksRootComponent",
	$routeConfig: [{
		path: "/",
		name: "TasksList",
		component: "tasksComponent",
		useAsDefault: true
	},{
		path: "/update/:id",
		name: "TaskUpdate",
		component: "taskCreateEditComponent"
	}]
};

export {
	tasksRootComponent
};