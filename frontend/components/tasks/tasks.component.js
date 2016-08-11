import './tasksStyles.styl';


class TasksComponentController {
	constructor(http) {
		this.http = http;		
		console.log('Tasks COMPONENT LOADED');
	}
	
}

TasksComponentController.$inject = [
	'httpGeneral'	
];

const tasksComponent = {
	controller: TasksComponentController,
	selector: 'tasksComponent',
	template: require('./tasksTemplate.pug')(),
};

export {
	tasksComponent
};