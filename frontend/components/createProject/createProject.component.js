import './createProject.component.styl';

class createProjectController {
	constructor(http) {
		this.http = http;
	}

}

createProjectController.$inject = [
	'httpGeneral'
];

const createProjectComponent = {
	controller: createProjectController,
	selector: 'createProjectComponent',
	template: require('./createProject-pug.component.pug')(),
	controllerAs: 'createProj'
};

export {
	createProjectComponent
};