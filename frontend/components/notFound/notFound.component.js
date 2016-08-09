import './notFound.styl';

class notFoundController {
	constructor() {
		console.log('404 COMPONENT LOADED');
	}
};

const notFoundComponent = {
	controller: notFoundController,
	selector: 'notFound',
	template: require('./404-pug.component.pug')(),
};

export {
	notFoundComponent
};