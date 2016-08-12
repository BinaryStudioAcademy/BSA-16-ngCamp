import './notFound.styl';

class notFoundController {
	constructor() {
		
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